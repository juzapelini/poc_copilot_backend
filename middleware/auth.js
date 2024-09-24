const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Substitua por uma chave secreta segura

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Autenticação necessária' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Token inválido' });
  }
};

module.exports = authenticate;