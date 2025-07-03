const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Node com Swagger',
      version: '1.0.0',
      description: 'Documentação da API com Swagger',
    },
    servers: [
      {
        url: 'http://10.0.30.106:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // arquivos com os comentários Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;