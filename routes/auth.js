const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');
const { JWT_SECRET } = require('../config');

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
  res.send({ token, fullName: user.fullName });
});

// Endpoint para logout
router.post('/logout', authenticate, (req, res) => {
  // No caso de JWT, o logout pode ser implementado no cliente removendo o token armazenado
  res.send({ message: `Logout realizado com sucesso para o usuário ${req.userId}` });
});

// Endpoint para verificar se o usuário está logado
router.get('/isLoggedIn', authenticate, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).send({ message: 'Usuário não encontrado' });
  }
  res.send({ fullName: user.fullName, token: req.header('Authorization').replace('Bearer ', '') });
});

module.exports = router;