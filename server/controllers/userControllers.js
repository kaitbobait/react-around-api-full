const User = require("../models/user");

//TODO
/**
 * create a login controller
 * then, authenticates the email/password
 * if email/pass are correct -->  create a JWT --> expires: 1 week
 * only the _id property should be written to the JWT payload:
 * {
  _id: "d285e3dceed844f902650f40"
    } 
 */

function login(req, res) {
  //gets the email and password from the REQUEST
  const { email, password } = req.body;
  //checks if a password/email was entered correctly
  if (!password || !email)
    return res.status(400).send({ message: "email or password is invalid" });
  //checks if email already exists
  Cards.findOne({ email })
    .then((user) => {
      if (user)
        return res.status(403).send({ message: "email already exists" });
      //if doesn't already exist, creates a new user
      return Cards.create({ email, password })
        .then((user) => {
          return res.status(200).send(user);
        })
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
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

//TODO hash password before saving
function createUser(req, res) {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar, email, password })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError")
        return res.status(400).send({ error: "invalid id number" });
      return res.status(400).send(err);
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
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  updateUserAvatar,
};