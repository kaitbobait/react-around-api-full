const Cards = require('../models/cards');

function getCards(req, res) {
  return Cards.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ error: 'invalid id number' });
      return res.status(500).send({ message: 'Internal Server Error' });
    });
}

// returns error 400, ownerId is undefined
function createCard(req, res) {
  const { name, link } = req.body;

  return Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ error: 'invalid id number' });
      return res.status(400).send({ message: 'Invalid data' });
    });
}

// works - was originally putting the owner id in instead of objectId
function deleteCard(req, res) {
  return Cards.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).json({ message: 'Card not found with Id' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).json({ message: 'invalid Id string' });
      return res.status(500).send({ message: 'Internal Server Error' });
    });
}

// works
function addLike(req, res) {
  return Cards.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true })
    .then((likes) => {
      if (likes) {
        res.send({ data: likes });
      } else {
        res.status(404).json({ message: 'Card not found with Id' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).json({ message: 'invalid Id string' });
      return res.status(500).send({ message: 'Internal Server Error' });
    });
}

// works
function deleteLike(req, res) {
  return Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .then((likes) => {
      if (likes) {
        res.send({ data: likes });
      } else {
        res.status(404).json({ message: 'Card not found with Id' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).json({ message: 'invalid Id string' });
      return res.status(500).send({ message: 'Internal Server Error' });
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
