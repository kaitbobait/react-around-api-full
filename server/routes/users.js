const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
  getUsers, getOneUser, updateUser, updateUserAvatar,
} = require('../controllers/userControllers');

router.get('/users', auth, getUsers);

//router.post('/users', createUser); //TODO delete - added to app.js

//do we even use this anymore?
//router.get('/users/:id', getOneUser);

// update user profile
router.patch('/users/me', auth, updateUser);
// update user avatar
router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;
