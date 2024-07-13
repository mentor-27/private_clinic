require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Patient = require('./models/Patient');

const login = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const isAuthorized = bcrypt.compareSync(password, user.password);

  if (!isAuthorized) {
    throw new Error('Неверный пароль');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return { user, token };
};

const newPatient = async patient => {
  const newPatient = await Patient.create(patient);

  return newPatient;
};

module.exports = { login, newPatient };
