const repository = require('../repositories/usuarioRepository');

class UsuarioService {
  static async getAll() {
    const usuarios = await repository.findAll();
    return usuarios;  // Já é um array de objetos usuario
  }

  static async getById(id) {
    const usuario = await repository.findById(id);
    return usuario;  // Pode ser null ou um objeto usuario
  }

  static async findByEmail(email) {
    const usuario = await repository.findByEmail(email);
    return usuario;  // Pode ser null ou um objeto usuario
  }

  static async create(dados) {
    const novousuario = await repository.create(dados);
    return novousuario;  // Retorna um objeto usuario
  }

  static async update(id, dados) {
    const usuarioAtualizado = await repository.update(id, dados);
    return usuarioAtualizado;  // Retorna um objeto usuario
  }

  static async remove(id) {
    const usuarioRemovido = await repository.remove(id);
    return usuarioRemovido;  // Retorna um objeto usuario ou null
  }
}

module.exports = UsuarioService;