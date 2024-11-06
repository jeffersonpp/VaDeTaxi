import express from "express";
import passageiroRouter from './route/passageirosRoute.js';
import motoristaRouter from './route/motoristasRoute.js';
import apagarRouter from './route/apagarRoute.js';
import corridaRouter from './route/corridasRoute.js';
import cors from 'cors';
import 'dotenv/config';



const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/passageiros', passageiroRouter);
app.use('/motoristas', motoristaRouter);
app.use('/corridas', corridaRouter);
app.use('/apagar', apagarRouter);
const server = app.listen(process.env.PORT);

server.on('error', (err) => {
    console.error('Error occurred:', err);
});

export { app, server };
