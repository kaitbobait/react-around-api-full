const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { AuthError } = require('../middlewares/errors');

const userSchema = new mongoose.Schema({
  // username, string from 2 to 30 characters, required field
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  // user information, string from 2 to 30 characters, required field
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  // link to the avatar, string, required field
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      // regex: /https?:\/\/[www.]?[-a-z0-9]{2,24}[/-a-z0-9_.#@]+/i
      validator(v) {
        const regex = /^https?:\/\/(www\.)?\S+/gi;
        return regex.test(v);
      },
      message: 'Please enter valid url',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false, // hash won't be returned from database by default
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  // trying to find the user by email use "this" or "User"?
  return this.findOne({ email })
    .select('+password') // this — the User model
    .then((user) => {
      console.log('user credentials:', user);
      // not found - rejecting the promise
      if (!user) {
        throw new AuthError('Incorrect email or password');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // reject promise
          throw new AuthError('Incorrect email or password');
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
