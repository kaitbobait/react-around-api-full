const express = require('express');

const router = express.Router();

const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cardsControllers');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

// like a card
router.put('/cards/:cardId/likes', addLike);
// delete user like from card
router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
