const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const AuthError = require('../errors/authError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');

function login(req, res, next) {
  // gets the email and password from the REQUEST
  const { email, password } = req.body;
  // checks if email already exists
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthError('Authorization Error: Incorrect email or password');
      }

      const token = generateToken(user._id);
      // console.log('token', token); //works
      // console.log(user._id); //returns id
      // assign token to a cookie
      res.cookie('token', token, { httpOnly: true });
      res.send({ token });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  return User.findById(req.user._id)
    .then((user) => {
    // console.log(user);
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('User not found');
    })
    .catch(next);
}

// is this needed?
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

// is this needed?
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
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    return Promise.reject(new NotFoundError('email or password invalid'));
  }
  // check to see if email already exists
  return User.findOne({ email }).then((exists) => {
    if (exists) {
      return Promise.reject(new ConflictError('Email already exists'));
    }

    // hashing the password
    return bcrypt
      .hash(req.body.password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => res.status(200).send({
        email: user.email,
        _id: user._id,
      }));
  })
    .catch(next);
}

// works
function updateUser(req, res, next) {
  return (
    User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      {
        new: true, // the then handler receives the updated entry as input
        runValidators: true, // the data will be validated before the update
      },
    )
      .then((user) => {
        if (!user) throw new NotFoundError('user Id not found');
        return res.json({ data: user });
      })
      .catch(next)
  );
}

// returns 404 not found
function updateUserAvatar(req, res, next) {
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar: '' },
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
    },
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
