import express from 'express';
import { createCorrida, updateCorridaStatus, getCorridaById, deleteCorrida } from '../controllers/corridaController.js';

const router = express.Router();

router.post('/nova', async (req, res)=>{
    const { passageiro_id, origem, destino } = req.body;
    const corrida = await createCorrida(passageiro_id, origem, destino);
    res.json(corrida);
});

router.patch('/atualizar/:id', updateCorridaStatus);

router.get('/detalhe/:id', async (req, res) => {
    const { id } = req.params;
    const corrida = await getCorridaById(id);    
    res.json(corrida);
});

router.post('/remove/:id', async (req, res) => {
    const { id } = req.params;
    await deleteCorrida(id);    
    res.json({'message': 'deleted'});
});

export default router;