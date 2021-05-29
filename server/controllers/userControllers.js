const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt');
const {
  RequestError,
  CastError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require('../middlewares/errors');

function login(req, res, next) {
  console.log('login function');
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('user in login function', user);
      if (!user) {
        console.log('USER DOES NOT EXIST');
        throw new AuthError('Authorization Error: Incorrect email or password');
      }

      const token = generateToken(user._id);

      res.cookie('token', token, { httpOnly: true });
      res.send({ token });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  console.log('user', req.user);
  return User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('User not found');
    })
    .catch(next);
}

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => {
      if (users) {
        return res.status(200).send(users);
      }
      return Promise.reject(new NotFoundError('User not found'));
    })
    .catch(next);
}

function getOneUser(req, res, next) {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError('User not found'));
      }
      return res.status(200).send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  console.log('createUser function');
  if (!email || !password) {
    return Promise.reject(new NotFoundError('email or password invalid'));
  }

  return User.findOne({ email }).then((user) => {
    if (user) {
      console.log('user already exists');
      return Promise.reject(new ConflictError('Email already exists'));
    }

    bcrypt
      .hash(req.body.password, 10)
      .then((hash) =>
        User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
      )
        // FIXME  it's complaining of 'user' being declared in the upperscope, so you cant use 'user'
        // again here. i recommend changing 'user' to 'isUser' or 'exists' on lines 74 and 75
      .then((user) =>
        res.status(200).send({
          email: user.email,
          _id: user._id,
        })
      )
      .catch(next);
  });
}

function updateUser(req, res, next) {
  return User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) throw new NotFoundError('user Id not found');
      return res.json({ data: user });
    })
    .catch(next);
}

function updateUserAvatar(req, res, next) {
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar: '' },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((link) => res.send({ data: link }))
    .catch(next);
}

module.exports = {
  login,
  getUsers,
  getCurrentUser,
  getOneUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
