import express from 'express';
import { createMotorista, todosMotoristas, deleteMotorista } from '../controllers/motoristaController.js';

const router = express.Router();

router.post('/novo', async (req, res) => {
    const { nome, telefone, carro } = req.body;
    const motorista = await createMotorista(nome, telefone, carro);
    res.json(motorista);
});

router.get('/todos', async (req, res) => {
    const motoristas = await todosMotoristas();
    res.json(motoristas);
});

// POST com parametro ID
router.post('/remove/:id', async (req, res) => {
    const id = req.params.id;
    await deleteMotorista(id);
    res.json({'message': 'deleted'});
});

export default router;
