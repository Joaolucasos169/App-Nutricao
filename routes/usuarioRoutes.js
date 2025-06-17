const express = require('express');
const controller = require('../controllers/usuarioController');
const ValidateUsuario = require('../middleware/validateUsuario');

class UsuarioRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    /**
     * @swagger
     * /usuarios:
     *   get:
     *     summary: Retorna todos os usuarios
     *     tags: [usuarios]
     *     responses:
     *       200:
     *         description: Lista de usuarios
     */
    this.router.get('/', controller.getAll);

    /**
     * @swagger
     * /usuarios/{id}:
     *   get:
     *     summary: Retorna um usuario por id
     *     tags: [usuarios]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: id do usuario
     *     responses:
     *       200:
     *         description: usuario encontrado
     *       404:
     *         description: usuario não encontrado
     */
    this.router.get('/:id', controller.getById);

    /**
     * @swagger
     * /usuarios:
     *   post:
     *     summary: Cria um novo usuario
     *     tags: [usuarios]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - id
     *               - nome
     *               - email
     *               - senha
     *               - papel
     *             properties:
     *               id:
     *                 type: string
     *               nome:
     *                 type: string
     *               email:
     *                 type: string
     *               senha:
     *                 type: number
     *               papel:
     *                 type: string
     *     responses:
     *       201:
     *         description: usuario criado com sucesso
     */
    this.router.post('/', ValidateUsuario.validate, controller.create);

    /**
     * @swagger
     * /usuarios/{id}:
     *   put:
     *     summary: Atualiza um Usuario existente
     *     tags: [usuarios]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: number
     *               nome:
     *                 type: string
     *               email:
     *                 type: string
     *               senha:
     *                 type: number
     *               papel:
     *                 type: string
     *     responses:
     *       200:
     *         description: Usuario atualizado
     *       404:
     *         description: Usuario não encontrado
     */
    this.router.put('/:id', ValidateUsuario.validate, controller.update);

    /**
     * @swagger
     * /usuarios/{id}:
     *   delete:
     *     summary: Remove um Usuario
     *     tags: [usuarios]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Usuario removido com sucesso
     */
    this.router.delete('/:id', controller.remove);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new UsuarioRoutes().getRouter();