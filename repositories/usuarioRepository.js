const db = require('../db/db');
const Usuario = require('../models/usuarioModel');

class UsuarioRepository {
  // Método para buscar todos os profissionais
  async findAll() {
    const result = await db.query('SELECT * FROM usuario');
    return result.rows.map(row => new Usuario(row));  // Retorna um array de objetos Usuario
  }

  // Método para buscar um Usuario por ID
  async findById(id) {
    const result = await db.query('SELECT * FROM usuario WHERE id = $1', [id]);
    return result.rows[0] ? new Usuario(result.rows[0]) : null;  // Retorna um objeto Usuario ou null
  }

  // Método para buscar um Usuario por email
  async findByEmail(email) {
    const result = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
    return result.rows[0] ? new Usuario(result.rows[0]) : null;  // Retorna um objeto Usuario ou null
  }

  // Método para criar um novo Usuario
  async create({ id, nome, email, senha, papel }) {
    const result = await db.query(
      'INSERT INTO usuario (id, nome, email, senha, papel) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, nome, email, senha, papel]
    );
    return new Usuario(result.rows[0]);
  }

  // Método para atualizar um Usuario
  async update({ id, nome, email, senha, papel }) {
    const result = await db.query(
      'UPDATE usuario SET id=$1, nome=$2, email=$3, senha=$4, papel=$5 RETURNING *',
      [id, nome, email, senha, papel]
    );
    return new Usuario(result.rows[0]);  // Retorna a instância atualizada de Usuario
  }

  // Método para remover um Usuario
  async remove(id) {
    const result = await db.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] ? new Usuario(result.rows[0]) : null;  // Retorna o Usuario deletado ou null
  }
}

module.exports = new UsuarioRepository();  // Exporte uma instância única da classe