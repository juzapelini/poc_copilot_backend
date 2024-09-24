const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  phone: String,
  email: String,
});

const Dentist = mongoose.model('Dentist', dentistSchema);

module.exports = Dentist;