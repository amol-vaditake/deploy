/* eslint-disable global-require */
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedUserFromToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const Role = require('../models/Role');
    decodedUserFromToken.isAdmin = await Role.findOne({
      role: 'admin',
      userId: decodedUserFromToken.id,
    });
    next();
  } catch (err) {
    res.status(401).json({
      error: err,
      message: 'Invalid Token',
    });
  }
};
