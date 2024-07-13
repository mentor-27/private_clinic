require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Patients = require('./models/Patient.js');
const auth = require('./middleware/auth.js');
const { login, newPatient } = require('./controller.js');

const PORT = 3005;

const app = express();

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.post('/', async (req, res) => {
  const { fullname, phone, issue } = req.body;
  const newRecord = await newPatient({
    date: new Date(),
    fullname,
    phone,
    issue,
  });

  res.json(newRecord);
});

app.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res.cookie('token', token, { httpOnly: true }).json({ data: { id: user._id } });
  } catch (e) {
    res.json({ data: { error: e.message } });
  }
});

app.post('/logout', async (req, res) => {
  res.cookie('token', '', { httpOnly: true }).json({ error: null });
});

app.use(auth);

app.get('/applist', async (req, res) => {
  try {
    const journal = await Patients.find();

    res.json(journal);
  } catch (e) {
    res.json({ error: e.message });
  }
});

mongoose.connect(process.env.DB_CONNECION_STRING).then(() => {
  app.listen(PORT, () => {
    console.info(`Server has been started on port ${PORT}...`);
  });
});
