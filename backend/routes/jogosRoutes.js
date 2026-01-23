/**
 * @swagger
 * components:
 *   schemas:
 *     Jogos:
 *       type: object
 *       required:
 *         - nome
 *         - categoria
 *         - ano_lancamento
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID auto-gerado do jogo
 *         nome:
 *           type: string
 *           description: O nome do jogo
 *         categoria:
 *           type: string
 *           description: A categoria do jogo
 *         ano_lancamento:
 *           type: integer
 *           description: Ano de lançamento do jogo
 */
/**
 * @swagger
 * tags:
 *   name: Jogos
 *   description: API de Jogos 
 * /api/jogos/todos:
 *   get:
 *     summary: Lista todos os jogos
 *     tags: [Jogos]
 *     responses:
 *       200:
 *         description: A lista de jogos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 * /api/jogos/id/{usuarioId}:
 *   get:
 *     summary: Recupera o jogo a partir do ID
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do jogo
 *     responses:
 *       200:
 *         description: A resposta do jogo por ID
 *         content:
 *           application/json:
 *       404:
 *         description: O jogo não foi encontrado
 * /api/jogos/categoria/{categoria}:
 *   get:
 *     summary: Recupera o jogo a partir da categoria
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         schema:
 *           type: string
 *         required: true
 *         description: Categoria do jogo
 *     responses:
 *       200:
 *         description: A resposta do jogo por categoria
 *         content:
 *           application/json:
 *       404:
 *         description: O jogo não foi encontrado
 */

import express from 'express';
import { getJogosByUsuarioId, getJogosByCategoria, getTodosJogos } from '../controllers/jogosController.js';

const router = express.Router();

router.get("/todos", getTodosJogos);
router.get("/id/:usuarioId", getJogosByUsuarioId);
router.get("/categoria/:categoria", getJogosByCategoria);

export default router;