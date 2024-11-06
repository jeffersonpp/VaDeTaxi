import test from 'ava';
import request from 'supertest';
import { app } from './server.js'; 

let passageiroId, motoristaId, corridaId;

test.serial('Deve criar passageiro', async t => {
  const passageiro = await request(app)
  .post('/passageiros/novo')
  .send({ nome: 'John Doe', telefone: '123456789' });
  t.is(passageiro.statusCode, 200);
  t.true(passageiro.body.hasOwnProperty('id'));
  passageiroId = passageiro.body.id;
});

test.serial('Deve criar motorista', async t => {
  const motorista = await request(app)
    .post('/motoristas/novo')
    .send({ nome: 'Jane Smith', carro: 'Toyota Prius', telefone: '987654321' });
  t.is(motorista.statusCode, 200);
  t.true(motorista.body.hasOwnProperty('id'));
  motoristaId = motorista.body.id;
});

test.serial('Deve criar nova corrida', async t => {
  const res = await request(app)
    .post('/corridas/nova')
    .send({
      passageiro_id: passageiroId,
      origem: 'Point A',
      destino: 'Point B'
    });
  t.is(res.statusCode, 200);
  t.true(res.body.hasOwnProperty('id'));
  t.is(res.body.status, 'Aguardando Motorista');
  corridaId = res.body.id;
});

test.serial('Deve atualizar o status da corrida para: Em Andamento', async t => {
  const res = await request(app)
    .patch(`/corridas/atualizar/${corridaId}`)
    .send({
      status: 'Em Andamento',
      motorista_id: motoristaId
    });  
  t.is(res.statusCode, 200);
  t.is(res.body.status, 'Em Andamento');
});

test.serial('Deve atualizar o status da corrida para: Finalizada', async t => {
  const res = await request(app)
    .patch(`/corridas/atualizar/${corridaId}`)
    .send({ status: 'Finalizada' });  
  t.is(res.statusCode, 200);
  t.is(res.body.status, 'Finalizada');
});

test.serial('Detalhes da corrida por ID', async t => {
  const res = await request(app).get(`/corridas/detalhe/${corridaId}`);
  t.is(res.statusCode, 200);
  t.is(res.body.id, corridaId);
  t.is(res.body.status, 'Finalizada');
  t.is(res.body.passageiro_id, passageiroId);
  t.is(res.body.motorista_id, motoristaId);
});

test.serial('Soft delete passageiro', async t => {
  const res = await request(app).post(`/passageiros/remove/${passageiroId}`);  
  t.is(res.statusCode, 200);
  t.is(res.body.message, 'deleted');
});

test.serial('Soft delete motorista', async t => {
  const res = await request(app).post(`/motoristas/remove/${motoristaId}`);  
  t.is(res.statusCode, 200);
  t.is(res.body.message, 'deleted');
});

test.serial('Hard delete test data', async t => {
  const res = await request(app).post(`/apagar`)
  .send({
    passageiro: passageiroId,
    motorista: motoristaId,
    corrida: corridaId
  });
  t.is(res.statusCode, 200);
  t.is(res.body.message, 'deleted');
});
