class Usuario {
  constructor({ id, nome, email, senha, papel }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.papel = papel;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      papel: this.papel
    };
  }
}
module.exports = Usuario;