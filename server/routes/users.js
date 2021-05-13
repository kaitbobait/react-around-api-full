const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getUsers,
  updateUser,
  updateUserAvatar,
} = require("../controllers/userControllers");

router.get("/users", auth, getUsers);

// update user profile
router.patch("/users/me", auth, updateUser);
// update user avatar
router.patch("/users/me/avatar", auth, updateUserAvatar);

module.exports = router;
