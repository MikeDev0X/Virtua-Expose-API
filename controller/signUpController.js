const res = require('express/lib/response');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.insertUsuario = (req,res) =>{
    const body= req.body;
    const sql = `INSERT INTO usuario(idUsuario, realname, nickname, correo, contraseña) VALUES(?,?,?,?,?)`

    conexion.query(sql, [body.idUsuario, body.realname, body.nickname, body.correo, body.contraseña], (error, results, fields)=>{

        if(error)
        res.send(error);

        res.json(results);
    })
}

module.exports.getUsuarios = (req,res) =>{
    const sql = `SELECT * FROM usuario`
    conexion.query(sql,(error,results,fields) =>{
        if(error)
            res.send(error);

        res.json(results);
    })
}