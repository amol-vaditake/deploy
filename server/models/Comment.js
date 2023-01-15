const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // comment done by user id
  by: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
