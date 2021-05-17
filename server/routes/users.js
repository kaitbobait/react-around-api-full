const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require("../controllers/userControllers");

router.get("/users", getUsers);

//get current user information //COMPLETE  - works
router.get("/users/me", getCurrentUser);

// update user profile
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser
);

// update user avatar
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateUserAvatar
);

module.exports = router;
