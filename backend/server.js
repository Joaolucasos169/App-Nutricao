require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');
const dbInit = require('./db/dbInit');

// Rotas
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const cadastroRoutes = require('./routes/cadastroRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.configureMiddlewares();
    this.routes();
    // this.initDb();
  }

  configureMiddlewares() {
    this.app.use(cors({
      origin: '*',
      methods: 'GET,POST,PUT,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Uploads de arquivo
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }));

    // Servir arquivos estáticos da pasta uploads
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Swagger
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  routes() {
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/usuario', usuarioRoutes);
    this.app.use('/api/cadastro', cadastroRoutes);
    this.app.use('/api/upload', uploadRoutes);

    // Rota padrão
    this.app.get('/', (req, res) => {
      res.json({
        nome: 'API ForNutri',
        versao: '1.0.0',
        ambiente: process.env.NODE_ENV,
        docs: `${req.protocol}://${req.get('host')}/api-docs`
      });
    });

    // Tratamento de erros
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Erro interno do servidor' });
    });
  }

  // async initDb() {
  //   try {
  //     await dbInit();
  //     console.log('Banco de dados inicializado com sucesso');
  //   } catch (error) {
  //     console.error('Erro ao inicializar banco de dados:', error);
  //     process.exit(1);
  //   }
  // }

  async start() {
    try {
      await this.initDb();
      this.app.listen(this.port, () => {
        console.log(`Servidor rodando na porta ${this.port}`);
      });
    } catch (error) {
      console.error('Falha crítica ao iniciar o servidor:', error);
      process.exit(1);
    }
  }
}

if (require.main === module) {
  const server = new Server();
  server.start();
}

module.exports = Server;
