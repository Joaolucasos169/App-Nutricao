const app = require('./App');
const mongoose = require('mongoose');
require('dotenv').config();

const errorHandler = require('./middleware/errorMiddleware');
app.use(errorHandler);         // ← último middleware
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));
