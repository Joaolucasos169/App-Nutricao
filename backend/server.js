require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const dbInit = require('./db/dbInit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.configureMiddlewares();
    this.routes();
    this.initDb();
  }

  configureMiddlewares() {
    this.app.use(express.json());
    
    // Configuração de CORS mais restritiva para produção
    const corsOptions = {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourapp.com']
        : true, // Permite qualquer origem em desenvolvimento
      credentials: true,
      optionsSuccessStatus: 200
    };
    
    this.app.use(cors(corsOptions));
    this.app.use(morgan('dev'));

    // Documentação Swagger
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  routes() {
    this.app.use('/usuarios', usuarioRoutes);
    this.app.use('/auth', authRoutes);

    this.app.get('/', (req, res) => {
      res.send('API de usuarios está funcionando!');
    });

    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    });
  }

  async initDb() {
    try {
      await dbInit();
      console.log('Tabela criada com sucesso!');
    } catch (err) {
      console.error('Erro ao criar a tabela: ', err);
    }
  }

  start() {
    this.app.listen(this.port, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${this.port}`);
      console.log(`Documentação Swagger em http://localhost:${this.port}/api-docs`);
    });
  }
}

module.exports = Server;