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

// COMPLETE 5.17 WORKS
router.get("/cards", getCards);
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }),
  createCard
);

//QUESTION do I need to add params or headers here?
router.delete("/cards/:cardId", deleteCard);

// like a card
router.put("/cards/:cardId/likes", addLike);

// delete user like from card
router.delete("/cards/:cardId/likes", deleteLike);

module.exports = router;
