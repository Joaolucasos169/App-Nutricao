// const db = require('./db'); // Conexão com o banco

// const createTable = async () => {
//   const checkTableQuery = `SELECT to_regclass('public.usuario');`;

//   try {
//     const result = await db.query(checkTableQuery);

//     // Verifica se a tabela existe
//     if (result.rows[0].to_regclass === null) {
//       const createQuery = `
//         CREATE TABLE usuario (
//           id SERIAL PRIMARY KEY,
//           nome VARCHAR(255) NOT NULL,
//           email VARCHAR(255) NOT NULL,
//           senha VARCHAR(255) NOT NULL,
//           papel VARCHAR(100) NOT NULL
//         );
//       `;
//       await db.query(createQuery);
//       console.log('Tabela "usuario" criada com sucesso!');
//     } else {
//       console.log('Tabela "usuario" já existe.');
//     }

//     // Verifica se o usuário de teste já existe
//     const checkUser = `SELECT * FROM usuario WHERE email = $1`;
//     const testEmail = 'teste@example.com';
//     const testUser = await db.query(checkUser, [testEmail]);

//     if (testUser.rows.length === 0) {
//       const insertUser = `
//         INSERT INTO usuario (nome, email, senha, papel)
//         VALUES ($1, $2, $3, $4)
//       `;
//       const values = ['Usuário de Teste', testEmail, '123456', 'usuario'];
//       await db.query(insertUser, values);
//       console.log('Usuário de teste criado com sucesso!');
//     } else {
//       console.log('Usuário de teste já existe.');
//     }
//   } catch (err) {
//     console.error('Erro ao inicializar o banco de dados:', err.message);
//   }
// };

// module.exports = createTable;
// db/dbInit.js
const db = require('./db'); // Importa a conexão com o banco de dados

const createTable = async () => {
  const checkTableQuery = `SELECT to_regclass('public.usuario');`;

  try {
    const result = await db.query(checkTableQuery);

    if (result.rows[0].to_regclass === null) {
      const createQuery = `
        CREATE TABLE usuario (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          senha VARCHAR(255) NOT NULL,
          papel VARCHAR(100) NOT NULL
        );
      `;
      await db.query(createQuery);
      console.log('Tabela "usuario" criada com sucesso!');
    } else {
      console.log('Tabela "usuario" já existe.');
    }

    const checkUser = `SELECT * FROM usuario WHERE email = $1`;
    const testEmail = 'teste@example.com';
    const testUser = await db.query(checkUser, [testEmail]);

    if (testUser.rows.length === 0) {
      const insertUser = `
        INSERT INTO usuario (nome, email, senha, papel)
        VALUES ($1, $2, $3, $4)
      `;
      const values = ['Usuário de Teste', testEmail, '123456', 'usuario'];
      await db.query(insertUser, values);
      console.log('Usuário de teste criado com sucesso!');
    } else {
      console.log('Usuário de teste já existe.');
    }
  } catch (err) {
    // Aqui imprimir o erro completo, não só a mensagem
    console.error('Erro ao inicializar o banco de dados:', err);
    // Repassar o erro para o caller tratar
    throw err;
  }
};

module.exports = createTable;
