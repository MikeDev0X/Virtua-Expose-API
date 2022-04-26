const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.getFriendsFromUser = (req,res) =>{
    const sql = `SELECT nickname FROM usuario WHERE idUsuario IN (SELECT idUsuario2 FROM amigos WHERE idUsuario1 = ?)`;
        conexion.query(sql,[req.params.id],(error,results,fields)=>{
            if(error)
                res.send(error);

            res.json(results);
        })
}

module.exports.getAllFriends = (req,res) =>{
    const sql = `SELECT * FROM amigos`;
        conexion.query(sql, (error,results,fields)=>{
            if(error)
                res.send(error);

            res.json(results);
        })
}

