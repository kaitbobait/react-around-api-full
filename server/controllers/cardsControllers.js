const Cards = require("../models/cards");
const {
  RequestError,
  CastError,
  AuthError,
  ForbiddenError,
  NotFoundError,
} = require("../middlewares/errors");
//TODO add throw errors

//COMPLETE 5.17 works
function getCards(req, res, next) {
  console.log("step 1");
  return Cards.find({})
    .then((cards) => {
      console.log("step 2");
      res.status(200).send(cards);
    })
    .catch(next);
}

// COMPLETE 5.17 WORKS
function createCard(req, res, next) {
  const { name, link } = req.body;
  console.log("req.user._id:", req.user);
  return Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new RequestError("Invalid data");
      }
      res.status(200).send(card);
    })
    .catch(next);
}

// works - was originally putting the owner id in instead of objectId
function deleteCard(req, res, next) {
  return Cards.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError("Card not found with ID");
      }
    })
    .catch(next);
}

// works
function addLike(req, res, next) {
  console.log('req.params', req.params);
  console.log('req.user-like:', req.user);//._id
  return Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .then((likes) => {
      if (likes) {
        res.send({ data: likes });
      } else {
        throw new NotFoundError("Card not found with Id");
      }
    })
    .catch(next);
}

// works
function deleteLike(req, res, next) {
  console.log('req.params-delete:', req.params);
  console.log('req.user-delete:', req.user);
  return Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .then((likes) => {
      if (likes) {
        res.send({ data: likes });
      } else {
        throw new NotFoundError("Card not found with Id");
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
