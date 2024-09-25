const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

router.use(authenticate);

// Endpoint para criar um novo usuário
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.send({ message: 'Usuário criado com sucesso' });
});

// Endpoint para obter todos os usuários
router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Endpoint para obter um usuário pelo ID
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// Endpoint para atualizar um usuário pelo ID
router.put('/:id', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
  res.send(user);
});

// Endpoint para excluir um usuário pelo ID
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: 'Usuário excluído com sucesso' });
});

module.exports = router;