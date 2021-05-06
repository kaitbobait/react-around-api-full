const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // username, string from 2 to 30 characters, required field
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // user information, string from 2 to 30 characters, required field
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // link to the avatar, string, required field
  avatar: {
    type: String,
    required: true,
    validate: {
      // regex: /https?:\/\/[www.]?[-a-z0-9]{2,24}[/-a-z0-9_.#@]+/i
      validator(v) {
        const regex = /^https?:\/\/(www\.)?\S+/gi;
        return regex.test(v);
      },
      message: 'Please enter valid url',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
