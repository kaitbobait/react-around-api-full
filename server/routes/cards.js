const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { celebrate, Joi } = require("celebrate");

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} = require("../controllers/cardsControllers");

router.get("/cards", auth, getCards);
router.post(
  "/cards",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().url(),
    }),
  }),
  createCard
);

//QUESTION do I need to add params or headers here?
router.delete("/cards/:cardId", auth, deleteCard);

// like a card
router.put("/cards/:cardId/likes", auth, addLike);

// delete user like from card
router.delete("/cards/:cardId/likes", auth, deleteLike);

module.exports = router;
