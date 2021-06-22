const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/userControllers');

// COMPLETE  - works 5.17
router.get('/users', getUsers);

// COMPLETE  - works 5.17
// get current user information
router.get('/users/me', getCurrentUser);

// update user profile
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

// update user avatar
router.patch(
  'users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
