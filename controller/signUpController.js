const res = require('express/lib/response');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);
const mensaje = "kiti";

module.exports.insertUsuario = (req,res) =>{
    const body= req.body;
    let mensaje = "El usuario ya existe";
    const sql = `INSERT INTO usuario(realname, nickname, correo, contrasena, experience) VALUES(?,?,?,?,?)`

    conexion.query(sql, [body.realname, body.nickname, body.correo, body.contrasena, body.experience], (error, results, fields)=>{

        if(error){
            console.log('kiti');
            res.send(error);
        }
        else{
            mensaje = 'Usuario insertado correctamente'
        }

        res.json({
            mensaje
        });
    })
    console.log(body);
}

module.exports.getUsuarios = (req,res) =>{
    const sql = `SELECT * FROM usuario`
    conexion.query(sql,(error,results,fields) =>{
        if(error)
            res.send(error);

        res.json(results);
    })
}

module.exports.removeUser = (req,res) =>{
    const sql = `DELETE FROM usuario WHERE idUsuario=?`
    const req1 = req.params.id;

    conexion.query(sql, [req.params.id], (error, results, fields)=>{
        if(error)
            res.send(error);

        res.json(results)
    })
}