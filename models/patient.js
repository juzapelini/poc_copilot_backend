const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: String,
  status: {
    type: String,
    enum: ['Prospect', 'Em tratamento', 'Tratamento Encerrado'],
  },
  paymentStatus: {
    type: String,
    enum: ['Pago', 'Pagando'],
  },
  mainDentist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dentist',
  },
  email: String,
  address: String,
  parentName: String,
  observation: String,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;