const Cards = require('../models/cards');
const {
  RequestError,
  CastError,
  AuthError,
  ForbiddenError,
  NotFoundError,
} = require('../middlewares/errors');

function getCards(req, res, next) {
  return Cards.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  return Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new RequestError('Invalid data');
      }
      res.status(200).send(card);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  return Cards.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Card not found with ID');
      }
    })
    .catch(next);
}

function addLike(req, res, next) {
  return Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((likes) => {
      if (likes) {
        res.send(likes);
      } else {
        throw new NotFoundError('Card not found with Id');
      }
    })
    .catch(next);
}

function deleteLike(req, res, next) {
  return Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((likes) => {
      if (likes) {
        res.send(likes);
      } else {
        throw new NotFoundError('Card not found with Id');
      }
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
