const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      if (users) {
        return res.status(200).send(users);
      }
      return res.status(404).json({ message: 'Users not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ error: 'invalid id number' });
      return res.status(400).send({ message: 'Error with database - k' });
    });
}

function getOneUser(req, res) {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User ID not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ error: 'invalid id number' });
      return res.status(500).send({ error: 'system error' });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ error: 'invalid id number' });
      return res.status(400).send(err);
    });
}

// works
function updateUser(req, res) {
  return User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, {
    new: true, // the then handler receives the updated entry as input
    runValidators: true, // the data will be validated before the update
  })
    .then((user) => res.json({ data: user }))
    // .catch(err => res.status(500).send({message: 'uh oh' }));
    .catch((err) => {
      // if (err.name === 'CastError') return res.status(400).send({ error: 'invalid id number' });
      if (err.name === 'CastError') return res.status(400).send(req.body);
      return res.status(500).send({ error: 'system error' });
    });
}

// returns 404 not found
function updateUserAvatar(req, res) {
  return User.findByIdAndUpdate(req.user._id, { avatar: '' }, {
    new: true, // the then handler receives the updated entry as input
    runValidators: true, // the data will be validated before the update
  })
    .then((link) => res.send({ data: link }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ error: 'invalid id number' });
      return res.status(500).send({ message: 'Error' });
    });
}

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
