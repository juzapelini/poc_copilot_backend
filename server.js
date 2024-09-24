const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://juzapelini:fMdv6fwx8LKTBmvv@clusterzap.ozyjg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterZap';

const options = {
  serverSelectionTimeoutMS: 30000, // Aumenta o timeout para 30 segundos
  socketTimeoutMS: 45000, // Aumenta o socket timeout para 45 segundos
};

mongoose.connect(uri, options)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

const dentistRoutes = require('./routes/dentists');
const userRoutes = require('./routes/users');
const patientRoutes = require('./routes/patients');

app.use('/dentists', dentistRoutes);
app.use('/users', userRoutes);
app.use('/patients', patientRoutes);

// Novo endpoint para testar a conexão com o MongoDB
app.get('/test-connection', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send({ message: 'Conexão com o MongoDB está funcionando!' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao conectar com o MongoDB', error });
  }
});

app.listen(5001, () => {
  console.log('Servidor rodando na porta 5001');
});