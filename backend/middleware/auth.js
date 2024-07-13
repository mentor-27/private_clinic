require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function auth(req, res, next) {
  if (!req.cookies.token) {
    res.json({ error: 'Нет доступа' });

    return;
  }

  const tokenData = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: tokenData.id });

  if (!user) {
    res.json({ error: 'Нет доступа' });

    return;
  }

  req.user = user;

  next();
};
