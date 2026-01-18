import express from 'express';
import { getJogosByUsuarioId, getJogosByCategoria, getTodosJogos } from '../controllers/jogosController.js';

const router = express.Router();

router.get("/todos", getTodosJogos);
router.get("/id/:usuarioId", getJogosByUsuarioId);
router.get("/categoria/:categoria", getJogosByCategoria);

export default router;