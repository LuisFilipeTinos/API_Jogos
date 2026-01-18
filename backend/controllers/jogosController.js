import { database } from '../config/db.js';

export async function getJogosByUsuarioId(req, res) {
    try {
        const { usuarioId } = req.params;

        if (!usuarioId) {
            return res.status(400).json({ error: 'Id de usuário é obrigatório' })
        }

        const { data, error } = await database
            .from('jogos')
            .select('*')
            .eq('id', usuarioId);

        
        if (error) {
            return res.status(500).json({ error: error.message })
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno' })
    }
}

export async function getJogosByCategoria(req, res) {
    try {
        const { categoria } = req.params;

        if (!categoria) {
            return res.status(400).json({ error: 'categoria é obrigatória' })
        }

        const { data, error } = await database
            .from('jogos')
            .select('*')
            .eq('categoria', categoria);

        
        if (error) {
            return res.status(500).json({ error: error.message })
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno' })
    }
}

export async function getTodosJogos(req, res) {
    try {

        const { data, error } = await database
            .from('jogos')
            .select('*');

        if (error) {
            return res.status(500).json({ error: error.message })
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno' })
    }
}