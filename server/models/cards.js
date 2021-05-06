const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    link: '',
    validate: {
      // regex: /https?:\/\/[www.]?[-a-z0-9]{2,24}[/-a-z0-9_.#@]+/i
      validator(v) {
        const regex = /^https?:\/\/(www\.)?\S+/gi;
        return regex.test(v);
      },
      message: 'Please enter valid url',
    },

  },
  // link to card author's model, objectId type
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user', // card author's model?
  },
  // list of users who liked the post, objectId array, empty array by default(default field)
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: 'user',
    },
  ],
  // creation date, Date type, default value Date.now
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardsSchema);
