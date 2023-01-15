/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable consistent-return */
const Post = require('../models/Post');

module.exports = {
  async create(req, res) {
    const { title } = req.body;
    const { id } = req.user;
    if (!title) {
      return res.status(400).send({
        error: 'Fields missing - title',
        massage: 'fail',
      });
    }
    try {
      const post = await new Post({ title, userId: id });
      await post.save();
      res.status(200).json({
        massage: 'done',
        post,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },

  async update(req, res) {
    const { title, postId } = req.body;
    if (!title || !postId) {
      return res.status(400).send({
        error: 'Fields missing - title or postId',
        massage: 'fail',
      });
    }
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(400).send({
          error: 'Post not found given id',
          massage: 'fail',
        });
      }
      if (post.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(400).send({
          error: 'Only Admin can edit other post',
          massage: 'fail',
        });
      }
      post.title = title;
      await post.save();
      res.status(200).json({
        massage: 'done',
        post,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },

  async deletePost(req, res) {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).send({
        error: 'Fields missing - postId',
        massage: 'fail',
      });
    }
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(400).send({
          error: 'Post not found given id',
          massage: 'fail',
        });
      }
      if (post.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(400).send({
          error: 'Only Admin can delete other post',
          massage: 'fail',
        });
      }
      await Post.remove({ _id: postId });
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
      postPerPage = 10,
    } = req.body;
    const { id } = req.user;
    try {
      const posts = await Post.find({ userId: id, ...filters })
        .sort(sort)
        .skip((page - 1) * postPerPage)
        .limit(postPerPage)
        .exec();

      res.status(200).json({
        massage: 'done',
        posts,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },

  async getById(req, res) {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).send({
        error: 'Fields missing - postId',
        massage: 'fail',
      });
    }
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(400).send({
          error: 'Post not found given id',
          massage: 'fail',
        });
      }
      res.status(200).json({
        massage: 'done',
        post,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },
};
