import express from 'express';
import { createPassageiro, todosPassageiros, deletePassageiro } from '../controllers/passageiroController.js';

const router = express.Router();

router.post('/novo', async (req, res) => {
    const {nome, telefone} = req.body;
    const passageiro = await createPassageiro(nome, telefone);
    res.json(passageiro);
});

router.get('/todos', async (req, res) => {
    const passageiros = await todosPassageiros();
    res.json(passageiros);
});

// POST com parametro ID
router.post('/remove/:id', async (req, res) => {
    const id = req.params.id;
    await deletePassageiro(id);
    res.json({'message': 'deleted'});
});

export default router;
