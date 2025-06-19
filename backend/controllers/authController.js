const bcrypt = require('bcryptjs');
const usuarioService = require("../services/usuarioService");
const jwt = require("jsonwebtoken");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    
    try {
      // Validação de entrada
      if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      const user = await usuarioService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // // Verificar senha com hash
      // const isPasswordValid = await bcrypt.compare(password, user.senha);
      // if (!isPasswordValid) {
      //   return res.status(401).json({ error: "Credenciais inválidas" });
      // }
      // Comparação simples sem bcrypt (NÃO RECOMENDADO)
      if (user.senha !== password) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET || "supersecret", 
        { expiresIn: "1h" }
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
    const { nome, email, senha, papel } = req.body;

    try {
      // Validação de entrada
      if (!nome || !email || !senha || !papel) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Verificar se o usuário já existe
      const existingUser = await usuarioService.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "Usuário já existe com este email" });
      }

      // Hash da senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      // const userData = {
      const newUser = await usuarioService.create({
        nome,
        email,
        senha: hashedPassword,
        papel
      });

      // const newUser = await usuarioService.create(userData);
      
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

