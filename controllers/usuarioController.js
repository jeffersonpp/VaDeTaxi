import db from '../database.js';

export const getUsuario = async (nome, telefone) => {
    return new Promise( async (resolve, reject) => {
        try {
            const result = await db.query(
            'INSERT INTO usuarios (nome, telefone) VALUES (?, ?)',
            [nome, telefone]
        );
        resolve(result[0].insertId);
        } catch (error) {
            reject(error.message);  
        }
    });
}

export const excluirUsuario = async (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            await db.query(
                'DELETE FROM usuarios WHERE id = ?',
                [id]
            );
            resolve({'deleted': id});
        } catch (error) {
            reject(error.message);
        }
    });
};
