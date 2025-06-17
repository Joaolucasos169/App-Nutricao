const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioService = require('../services/usuarioService');

class AuthController {
  async login(req, res) {
    const { email, senha } = req.body;
    
    try {
      // Validação de entrada
      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      const user = await UsuarioService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Verificar senha com hash
      const isValidPassword = await bcrypt.compare(senha, user.senha);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "supersecret",
        { expiresIn: "24h" }
      );

      res.status(200).json({
        token,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          papel: user.papel
        }
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async register(req, res) {
    const { id, nome, email, senha, papel } = req.body;
    
    try {
      // Validação de entrada
      if (!id || !nome || !email || !senha || !papel) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Verificar se o email já existe
      const existingUser = await UsuarioService.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "Email já está em uso" });
      }

      // Hash da senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      const userData = {
        id,
        nome,
        email,
        senha: hashedPassword,
        papel
      };

      const newUser = await UsuarioService.create(userData);
      
      // Remover senha do retorno
      const { senha: _, ...userWithoutPassword } = newUser;
      
      res.status(201).json({
        message: "Usuário criado com sucesso",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Erro no registro:", error);
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }
}

module.exports = new AuthController();

