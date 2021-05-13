const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt');

//TODO
/**
 * create a login controller
 * then, authenticates the email/password
 * if email/pass are correct -->  create a JWT --> //TODO expires: 1 week
 * only the _id property should be written to the JWT payload:
 * {
  _id: "d285e3dceed844f902650f40"
    } 
 */
function login(req, res) {
  //gets the email and password from the REQUEST
  const { email, password } = req.body;
  //checks if email already exists
  User.findUserByCredentials(email, password)
    .then((user) => {
      if(!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      
      const token = generateToken(user._id);
      console.log('token', token);// undefined
      console.log(user._id); //returns id
      //assign token to a cookie
      res.cookie('token', token, {httpOnly: true});
      res.send(token);
    })
    .catch((err) => {
      res.status(401).send(err)
    });
  
}

function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      if (users) {
        return res.status(200).send(users);
      }
      return res.status(404).json({ message: "Users not found" });
    })
    .catch((err) => {
      if (err.name === "CastError")
        return res.status(400).send({ error: "invalid id number" });
      return res.status(400).send({ message: "Error with database - k" });
    });
}

function getOneUser(req, res) {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User ID not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError")
        return res.status(400).send({ error: "invalid id number" });
      return res.status(500).send({ error: "system error" });
    });
}

//COMPLETE hash password before saving
function createUser(req, res) {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password){
    return res.status(400).send({ message: "email or password invalid" });
  }
  //check to see if email already exists
  return User.findOne({ email }).then((user) => {
    if (user) return res.status(403).send({ message: "email already exists" });

    // hashing the password
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
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        if (err.name === "CastError")
          return res.status(400).send({ error: "invalid id number" });
        return res.status(400).send(err);
      });
  });
}

// works
function updateUser(req, res) {
  return (
    User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      {
        new: true, // the then handler receives the updated entry as input
        runValidators: true, // the data will be validated before the update
      }
    )
      .then((user) => res.json({ data: user }))
      // .catch(err => res.status(500).send({message: 'uh oh' }));
      .catch((err) => {
        // if (err.name === 'CastError') return res.status(400).send({ error: 'invalid id number' });
        if (err.name === "CastError") return res.status(400).send(req.body);
        return res.status(500).send({ error: "system error" });
      })
  );
}

// returns 404 not found
function updateUserAvatar(req, res) {
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar: "" },
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
    }
  )
    .then((link) => res.send({ data: link }))
    .catch((err) => {
      if (err.name === "CastError")
        return res.status(400).send({ error: "invalid id number" });
      return res.status(500).send({ message: "Error" });
    });
}

module.exports = {
  login,
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
