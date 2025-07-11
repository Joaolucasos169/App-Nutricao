const UsuarioService = require('../services/usuarioService');

class UsuarioController {
  // Buscar todos os usuarios
  async getAll(req, res) {
    try {
      const usuarios = await UsuarioService.getAll();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Erro ao buscar usuarios:', error);
      res.status(500).json({ error: 'Erro ao buscar usuarios.' });
    }
  }

  // Buscar por matrícula
  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.getById(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario não encontrado.' });
      }

      res.status(200).json(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuario por ID:', error);
      res.status(500).json({ error: 'Erro ao buscar usuario.' });
    }
  }

  // Criar usuario
  async create(req, res) {
  try {
    const { id, nome, email, senha, papel } = req.body;

    if (!id || id.length !== 11) {
      return res.status(400).json({ error: 'CPF inválido. Deve conter 11 dígitos.' });
    }

    const novoUsuario = await UsuarioService.create({ id, nome, email, senha, papel });

    return res.status(201).json({
      message: 'Cadastro realizado com sucesso!',
      data: novoUsuario
    });
  } catch (error) {
    console.error('Erro ao criar usuario:', error);
    res.status(500).json({ error: 'Erro ao criar usuario.' });
  }
}


  // Atualizar usuario
  async update(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;
      const usuarioAtualizado = await UsuarioService.update(id, dados);

      if (!usuarioAtualizado) {
        return res.status(404).json({ error: 'usuario não encontrado para atualizar.' });
      }

      res.status(200).json({ message: 'usuario atualizado', data: usuarioAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar usuario:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuario.' });
    }
  }

  // Remover usuario
  async remove(req, res) {
    try {
      const { id } = req.params;
      const resultado = await UsuarioService.remove(id);

      if (!resultado) {
        return res.status(404).json({ error: 'usuario não encontrado para remover.' });
      }

      res.status(200).json({ message: 'usuario removido com sucesso.' });
    } catch (error) {
      console.error('Erro ao remover usuario:', error);
      res.status(500).json({ error: 'Erro ao remover usuario.' });
    }
  }

  async completeRegistration(req, res) {
  try {
    const { id } = req.params;
    const dados = req.body;
    const usuario = await UsuarioService.completeRegistration(id, dados);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao completar cadastro' });
  }
}
}

module.exports = new UsuarioController();