const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/patient');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.use(authenticate);

// Endpoint para adicionar um novo paciente
router.post('/', async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.send(patient);
});

// Endpoint para listar todos os pacientes
router.get('/', async (req, res) => {
  const patients = await Patient.find().populate('mainDentist');
  res.send(patients);
});

// Endpoint para editar um paciente
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // Verifique se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true });

  if (!patient) {
    return res.status(404).send({ message: 'Paciente não encontrado' });
  }

  res.send(patient);
});

// Endpoint para excluir um paciente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Verifique se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  const patient = await Patient.findByIdAndDelete(id);

  if (!patient) {
    return res.status(404).send({ message: 'Paciente não encontrado' });
  }

  res.send({ message: 'Paciente excluído com sucesso' });
});

module.exports = router;