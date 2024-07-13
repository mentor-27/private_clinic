const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  issue: {
    type: String,
    required: false,
  },
});

const Patient = mongoose.model('Patients', PatientSchema);

module.exports = Patient;
