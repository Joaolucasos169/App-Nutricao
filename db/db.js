// // db/index.js
// require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env

// const { Pool } = require('pg');  // Importa o módulo 'pg' para conexão com o PostgreSQL

// // Configuração da conexão com o PostgreSQL usando as variáveis de ambiente
// const pool = new Pool({
//   user: process.env.DB_USER,      // Utiliza a variável DB_USER do arquivo .env
//   host: process.env.DB_HOST,      // Utiliza a variável DB_HOST do arquivo .env
//   database: process.env.DB_NAME,  // Utiliza a variável DB_NAME do arquivo .env
//   password: process.env.DB_PASSWORD, // Utiliza a variável DB_PASSWORD do arquivo .env
//   port: process.env.DB_PORT,      // Utiliza a variável DB_PORT do arquivo .env
// });

// // Função para executar as queries no banco
// const query = (text, params) => pool.query(text, params);

// module.exports = { query };  // Exporta a função de query para uso em outras partes do código
// db/index.js
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const query = (text, params) => pool.query(text, params);

module.exports = { query };
