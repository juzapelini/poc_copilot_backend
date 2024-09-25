const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Token inválido.' });
  }
};

module.exports = authenticate;