const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticate = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key'; // Substitua por uma chave secreta segura

// Endpoint para adicionar um novo usuário
router.post('/', async (req, res) => {
  const { email, password, fullName, nickname, roles, phone } = req.body;

  // Verifique se o e-mail já está em uso
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: 'E-mail já está em uso' });
  }

  const user = new User({ email, password, fullName, nickname, roles, phone });
  await user.save();
  res.send(user);
});

// Endpoint para listar todos os usuários
router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Endpoint para editar um usuário
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // Verifique se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  const user = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (!user) {
    return res.status(404).send({ message: 'Usuário não encontrado' });
  }

  res.send(user);
});

// Endpoint para excluir um usuário
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Verifique se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).send({ message: 'Usuário não encontrado' });
  }

  res.send({ message: 'Usuário excluído com sucesso' });
});

// Endpoint para login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: 'Email ou senha inválidos' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: 'Email ou senha inválidos' });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
});

// Endpoint para logout
router.post('/logout', authenticate, (req, res) => {
  // No caso de JWT, o logout pode ser implementado no cliente removendo o token armazenado
  res.send({ message: `Logout realizado com sucesso para o usuário ${req.userId}` });
});

// Endpoint para verificar se o usuário está logado
router.get('/isLoggedIn', authenticate, (req, res) => {
  res.send({ message: `Usuário ${req.userId} está logado` });
});

module.exports = router;