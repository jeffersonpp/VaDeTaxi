import db from '../database.js';
import { getUsuario, excluirUsuario } from './usuarioController.js';

export const createPassageiro = async (nome, telefone) => {
    return new Promise( async (resolve, reject) => {
        const usuario = await getUsuario(nome, telefone);
        try {
            const result = await db.query(
                'INSERT INTO passageiros (usuario_id) VALUES (?)',
                [usuario]
            );
            resolve({'id': result[0].insertId, 'nome': nome, 'telefone': telefone});
        } catch (error) {
            reject(error.message);
        }
    });
};

export const todosPassageiros = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            const passageiros = await db.query(
                'SELECT * FROM passageiros WHERE apagado_em IS NULL', []
            );
            const data = passageiros[0];
            resolve(data);
        } catch (error) {
            reject(error.message);
        }
    });
};

export const getPassageiro = async (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const result = await db.query(
                'SELECT * FROM passageiros WHERE id = ? AND apagado_em IS NULL',
                [id]
            );
            resolve(result[0]);
        } catch (error) {
            reject(error.message);
        }
    });
};
export const deletePassageiro = async (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const result = await db.query(
                'UPDATE passageiros SET apagado_em = NOW() WHERE id = ?',
                [id]
            );
            resolve({'deleted': id});
        } catch (error) {
            reject(error.message);
        }
    });
};

export const excluirPassageiro = async (id) => {
    const [passageiro] = await db.query('SELECT * FROM passageiros WHERE id = ?',[id]);
    await excluirUsuario(passageiro[0].usuario_id);

    return new Promise( async (resolve, reject) => {
        try {
            await db.query(
                'DELETE FROM passageiros WHERE id = ?',
                [id]
            );
            resolve({'deleted': id});
        } catch (error) {
            reject(error.message);
        }
    });
};
