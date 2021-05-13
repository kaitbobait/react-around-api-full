const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cardsControllers');

router.get('/cards', auth, getCards);
router.post('/cards', auth, createCard);
router.delete('/cards/:cardId', auth, deleteCard);

// like a card
router.put('/cards/:cardId/likes', auth, addLike);
// delete user like from card
router.delete('/cards/:cardId/likes', auth, deleteLike);

module.exports = router;
