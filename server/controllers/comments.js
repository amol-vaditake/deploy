/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable consistent-return */
const Comment = require('../models/Comment');

module.exports = {
  async create(req, res) {
    const { postId, title } = req.body;
    const { id } = req.user;
    if (!postId || !title) {
      return res.status(400).send({
        error: 'Fields missing - title or postId',
        massage: 'fail',
      });
    }
    try {
      const comment = await new Comment({ title, by: id, postId });
      await comment.save();
      res.status(200).json({
        massage: 'done',
        comment,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },

  async update(req, res) {
    const { title, commentId } = req.body;
    if (!title || !commentId) {
      return res.status(400).send({
        error: 'Fields missing - title or commentId',
        massage: 'fail',
      });
    }
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(400).send({
          error: 'Comment not found given id',
          massage: 'fail',
        });
      }
      if (comment.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(400).send({
          error: 'Only Admin can edit other comment',
          massage: 'fail',
        });
      }
      comment.title = title;
      await comment.save();
      res.status(200).json({
        massage: 'done',
        comment,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },

  async deleteComment(req, res) {
    const { commentId } = req.body;
    if (!commentId) {
      return res.status(400).send({
        error: 'Fields missing - title or commentId',
        massage: 'fail',
      });
    }
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(400).send({
          error: 'comment not found given id',
          massage: 'fail',
        });
      }
      if (comment.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(400).send({
          error: 'Only Admin can edit other comment',
          massage: 'fail',
        });
      }
      await Comment.remove({ _id: commentId });
      res.status(200).json({
        massage: 'Deleted successfully',
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },

  async get(req, res) {
    // page keeping 10 per page default
    const {
      page = 1,
      filters = {},
      sort = { title: 1 },
      commentPerPage = 10,
    } = req.body;
    const { id } = req.user;
    try {
      const comments = await Comment.find({ userId: id, ...filters })
        .sort(sort)
        .skip((page - 1) * commentPerPage)
        .limit(commentPerPage)
        .exec();

      res.status(200).json({
        massage: 'done',
        comments,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },

  async getById(req, res) {
    const { commentId } = req.body;
    if (!commentId) {
      return res.status(400).send({
        error: 'Fields missing - commentId',
        massage: 'fail',
      });
    }
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(400).send({
          error: 'Comment not found given id',
          massage: 'fail',
        });
      }
      res.status(200).json({
        massage: 'done',
        comment,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },
};
