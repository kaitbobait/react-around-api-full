const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getUsers,
  updateUser,
  updateUserAvatar,
  getCurrentUser
} = require("../controllers/userControllers");

router.get("/users", auth, getUsers);

//get current user information //COMPLETE  - works
router.get("/users/me", auth, getCurrentUser);

// update user profile
router.patch("/users/me", auth, updateUser);

// update user avatar
router.patch("/users/me/avatar", auth, updateUserAvatar);

module.exports = router;
