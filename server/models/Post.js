/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

const { Schema } = mongoose;
const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model('post', postSchema);
module.exports = Post;
