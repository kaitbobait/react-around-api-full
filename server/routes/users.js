const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getUsers,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require("../controllers/userControllers");

router.get("/users", auth, getUsers);

//get current user information //COMPLETE  - works
router.get("/users/me", auth, getCurrentUser);

// update user profile
router.patch(
  "/users/me",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().url(),
      email: Joi.string().required().unique().email(),
      password: Joi.string().required(),
    }),
  }),
  updateUser
);

// update user avatar
router.patch(
  "/users/me/avatar",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().url(),
      email: Joi.string().required().unique().email(),
      password: Joi.string().required(),
    }),
  }),
  updateUserAvatar
);

module.exports = router;
