const express = require('express');
const mongoose = require('mongoose');
const Dentist = require('../models/dentist');

const router = express.Router();

// Endpoint para adicionar um novo dentista
router.post('/', async (req, res) => {
  const dentist = new Dentist(req.body);
  await dentist.save();
  res.send(dentist);
});

// Endpoint para listar todos os dentistas
router.get('/', async (req, res) => {
  const dentists = await Dentist.find();
  res.send(dentists);
});

// Endpoint para editar um dentista
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // Verifique se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  const dentist = await Dentist.findByIdAndUpdate(id, req.body, { new: true });

  if (!dentist) {
    return res.status(404).send({ message: 'Dentista não encontrado' });
  }

  res.send(dentist);
});

// Endpoint para excluir um dentista
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Verifique se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  const dentist = await Dentist.findByIdAndDelete(id);

  if (!dentist) {
    return res.status(404).send({ message: 'Dentista não encontrado' });
  }

  res.send({ message: 'Dentista excluído com sucesso' });
});

module.exports = router;