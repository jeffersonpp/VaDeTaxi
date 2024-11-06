import db from '../database.js';

export const createCorrida = async (passageiro_id, origem, destino) => {
    return new Promise( async (resolve, reject) => {
        try {
            const [passageiro] = await db.query('SELECT * FROM passageiros WHERE id = ?', [passageiro_id]);
            if (!passageiro) {
                reject('Passageiro não encontrado');
            }
            const result = await db.query(
            'INSERT INTO corridas (passageiro_id, origem, destino, data_hora_solicitacao) VALUES (?, ?, ?, NOW())',
            [passageiro_id, origem, destino]
            );
            resolve({ id: result[0].insertId, status: "Aguardando Motorista" });
        } catch (error) {
            reject(error.message);
        }
    });
}

export const updateCorridaStatus = async (req, res) => {
  const { status, motorista_id } = req.body;
  const { id } = req.params;

  try {
    const corrida = await getCorridaById(id);

    if (!corrida) return res.status(404).json({ error: 'Corrida não encontrada' });

    if (status === 'Em Andamento' && corrida.status === 'Aguardando Motorista') {
      await db.query('UPDATE corridas SET status = ?, motorista_id = ?, data_hora_inicio = NOW() WHERE id = ?', [status, motorista_id, id]);
      res.json({ status });
    } else if (status === 'Finalizada' && corrida.status === 'Em Andamento') {
      await db.query('UPDATE corridas SET status = ?, data_hora_fim = NOW() WHERE id = ?', [status, id]);
      res.json({ status });
    } else {
      res.status(400).json({ error: 'Status de atualização inválido' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCorridaById = async (id) => {
  return new Promise( async (resolve, reject) => {
    const [result] = await db.query('SELECT * FROM corridas WHERE id = ?', [id]);
    if (result[0].hasOwnProperty('id')) {
      resolve(result[0]);
    } else {
      reject('not found!');
    }
  });
};

export const deleteCorrida = async (id) => {
  return new Promise( async (resolve, reject) => {
      try {
          await db.query(
              'UPDATE corridas SET apagado_em = NOW() WHERE id = ?',
              [id]
          );
          resolve({'deleted': id});
      } catch (error) {
          reject(error.message);
      }
  });
};

export const excluirCorrida = async (id) => {
  return new Promise( async (resolve, reject) => {
      try {
          await db.query(
              'DELETE FROM corridas WHERE id = ?',
              [id]
          );
          resolve({'deleted': id});
      } catch (error) {
          reject(error.message);
      }
  });
};
