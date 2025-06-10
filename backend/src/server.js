const mongoose = require('mongoose');
const app = require('./App');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config({ path: './config/config.env' });

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Servidor rodando em modo ${process.env.NODE_ENV} na porta ${PORT}`)
);

// Lidar com rejeições de promessas não tratadas
process.on('unhandledRejection', (err, promise) => {
  console.log(`Erro: ${err.message}`);
  // Fechar servidor e sair do processo
  server.close(() => process.exit(1));
});