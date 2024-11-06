import mysql from 'mysql2/promise';
import 'dotenv/config'

let pool = mysql.createPool({
  connectionLimit: 1000,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  });
  
  pool.getConnection((err,con)=> {
    if(err)
    throw err;
    con.release();
  });

pool.getConnection( (err, con) => {
    if (err) throw err;

    con.query("CREATE DATABASE IF NOT EXISTS "+ process.env.MYSQL_DATABASE, async (err, _result) => {
        if (err) throw err;
    });
    con.query(`USE ${process.env.MYSQL_DATABASE}`, (err) => {
        if (err) throw err;  

        let sql = "CREATE TABLE IF NOT EXISTS usuarios (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255) NOT NULL, telefone VARCHAR(25) UNIQUE, criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        con.query(sql, function (err, _result) {
            if (err) throw err;
        });

        sql = "CREATE TABLE IF NOT EXISTS passageiros (id INT AUTO_INCREMENT PRIMARY KEY, usuario_id INT(20) NOT NULL, apagado_em TIMESTAMP)";
        con.query(sql, function (err, _result) {
            if (err) throw err;
        });

        sql = "CREATE TABLE IF NOT EXISTS motoristas (id INT AUTO_INCREMENT PRIMARY KEY, usuario_id INT(20) NOT NULL, carro VARCHAR(255) NOT NULL, apagado_em TIMESTAMP)";
        con.query(sql, function (err, _result) {
            if (err) throw err;
        });

        sql = "CREATE TABLE IF NOT EXISTS corridas (id INT AUTO_INCREMENT PRIMARY KEY, passageiro_id INT(20) NOT NULL, motorista_id INT(20), status ENUM('Aguardando Motorista', 'Em Andamento', 'Finalizada') NOT NULL DEFAULT 'Aguardando Motorista', origem TEXT, destino TEXT, data_hora_solicitacao TIMESTAMP, data_hora_inicio TIMESTAMP, data_hora_fim TIMESTAMP, valor DECIMAL(10, 2))";
        con.query(sql, function (err, _result) {
            if (err) throw err;
        });
    });
});

pool = mysql.createPool({
    connectionLimit: 1000,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export default pool;
