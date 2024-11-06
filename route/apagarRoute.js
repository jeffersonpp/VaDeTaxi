import express from 'express';
import { excluirPassageiro } from '../controllers/passageiroController.js';
import { excluirMotorista } from '../controllers/motoristaController.js';
import { excluirCorrida } from '../controllers/corridaController.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const {passageiro, motorista, corrida} = req.body;
    await excluirPassageiro(passageiro);
    await excluirMotorista(motorista);
    await excluirCorrida(corrida);
    res.json({'message': 'deleted'})
});

export default router;
