const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getUsers,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/userControllers');

function validateUrl(string) {
  const result = validator.isURL(string);
  if (result) {
    return string;
  }
  throw new Error('URL validation err');
}

router.get('/users', getUsers);

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
      avatar: Joi.string().required().custom(validateUrl),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
