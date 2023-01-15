/* eslint-disable consistent-return */
const User = require('../models/User');

const validateEmail = ({ email }) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

module.exports = {
  async loginUser(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send({
        error: 'Fields missing for login/register',
        massage: 'fail',
      });
    }
    const isEmailValid = validateEmail({ email });
    if (!isEmailValid) {
      return res.status(400).send({
        error: 'Invalid email address',
        massage: 'fail',
      });
    }
    if (password.length < 6) {
      return res.status(400).send({
        error: 'Invalid password (password should be more than 6 letter)',
        massage: 'fail',
      });
    }
    if (name.length < 3) {
      return res.status(400).send({
        error: 'Invalid name (name should be more than 3 letter)',
        massage: 'fail',
      });
    }
    try {
      let user;
      const oldUser = await User.findByEmailAndPassword({
        email,
        password,
      });
      // creating if user is not there
      if (oldUser.notFound) user = await new User({ email, password, name });
      else user = oldUser;
      // here user will also saved
      const accessToken = await user.generateToken();
      res.status(200).json({
        accessToken: `JWT ${accessToken}`,
        massage: 'done',
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        ...(oldUser.notFound ? { registered: true } : {}),
      });
    } catch (err) {
      res.status(400).send({
        error: 'Invalid Credential',
        massage: 'fail',
      });
    }
  },

  async logoutUser(req, res) {
    const { id } = req.user;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).send({
          error: 'User not found',
          massage: 'fail',
        });
      }
      user.accessToken = null;
      await user.save();
      res.status(200).send({
        massage: 'logout successfully',
      });
    } catch (err) {
      res.status(400).send({
        error: 'Invalid Credential',
        massage: 'fail',
      });
    }
  },

  async changePass(req, res) {
    const { newPassword } = req.body;
    const { id } = req.user;
    if (!newPassword) {
      return res.status(400).send({
        error: 'New password missing',
        massage: 'fail',
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send({
        error: 'User not found',
        massage: 'fail',
      });
    }
    user.password = newPassword;
    await user.save;
    res.status(200).json({ massage: 'done' });
  },
};
