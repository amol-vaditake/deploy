/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable consistent-return */
const Role = require('../models/Role');

module.exports = {
  async create(req, res) {
    const { role } = req.body;
    const { id } = req.user;
    if (!role) {
      return res.status(400).send({
        error: 'Fields missing - role',
        massage: 'fail',
      });
    }
    try {
      const r = await new Role({ role, userId: id });
      await r.save();
      res.status(200).json({
        massage: 'done',
        role: r,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },

  async deleteRole(req, res) {
    const { roleId } = req.body;
    if (!roleId) {
      return res.status(400).send({
        error: 'Fields missing - roleId',
        massage: 'fail',
      });
    }
    try {
      const r = await Role.findById(roleId);
      if (!r) {
        return res.status(400).send({
          error: 'Role not found given id',
          massage: 'fail',
        });
      }
      await Role.remove({ _id: roleId });
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
      rolePerPage = 10,
    } = req.body;
    const { id } = req.user;
    try {
      const roles = await Role.find({ userId: id, ...filters })
        .sort(sort)
        .skip((page - 1) * rolePerPage)
        .limit(rolePerPage)
        .exec();

      res.status(200).json({
        massage: 'done',
        roles,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },

  async getById(req, res) {
    const { roleId } = req.body;
    if (!roleId) {
      return res.status(400).send({
        error: 'Fields missing - roleId',
        massage: 'fail',
      });
    }
    try {
      const r = await Role.findById(roleId);
      if (!r) {
        return res.status(400).send({
          error: 'rold not found given id',
          massage: 'fail',
        });
      }
      res.status(200).json({
        massage: 'done',
        role: r,
      });
    } catch (err) {
      res.status(400).send({
        error: 'Something went wrong',
        massage: 'fail',
      });
    }
  },
};
