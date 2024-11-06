import db from '../database.js';
import { getUsuario, excluirUsuario } from './usuarioController.js';

export const createMotorista = async (nome, telefone, carro) => {
    const usuario = await getUsuario(nome, telefone);
    return new Promise( async (resolve, reject) => {
        try {
            const result = await db.query(
                'INSERT INTO motoristas (usuario_id, carro) VALUES (?, ?)',
                [usuario, carro]
            );

            resolve({'id': result[0].insertId, 'nome': nome, 'telefone': telefone, 'carro': carro});

        } catch (error) {
            reject(error.message);
        }
    });
};

export const todosMotoristas = async (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const result = await db.query(
                'SELECT * FROM motoristas WHERE apagado_em IS NULL',
                [id]
            );
            const data = result[0];
            resolve(data);

        } catch (error) {
            reject(error.message);
        }
    });
};

export const getMotorista = async (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const result = await db.query(
                'SELECT * FROM motoristas WHERE id = ? AND apagado_em IS NULL',
                [id]
            );
            resolve(result[0]);
        } catch (error) {
            reject(error.message);
        }
    });
};

export const deleteMotorista = async (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const result = await db.query(
                'UPDATE motoristas SET apagado_em = NOW() WHERE id = ?',
                [id]
            );
            resolve({'deleted': id});
        } catch (error) {
            reject(error.message);
        }
    });
};

export const excluirMotorista = async (id) => {
    const [motorista] = await db.query('SELECT * FROM motoristas WHERE id = ?',[id]);
    await excluirUsuario(motorista[0].usuario_id);
    return new Promise( async (resolve, reject) => {
        try {
            await db.query(
                'DELETE FROM motoristas WHERE id = ?',
                [id]
            );
            resolve({'deleted': id});
        } catch (error) {
            reject(error.message);
        }
    });
};
