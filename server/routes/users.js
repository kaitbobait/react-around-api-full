const express = require('express');

const router = express.Router();

const {
  getUsers, getOneUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/userControllers');

router.get('/users', getUsers);
router.post('/users', createUser);

router.get('/users/:id', getOneUser);

// update user profile
router.patch('/users/me', updateUser);
// update user avatar
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
