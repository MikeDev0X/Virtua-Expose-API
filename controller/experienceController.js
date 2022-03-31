const res = require('express/lib/response');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);


module.exports.getUserExperienceByNickname = (req,res) =>{
    const sql = `SELECT Experience FROM usuario WHERE nickname = ?`
    conexion.query(sql,[req.params.nickname],(error,results,fields) =>{
        if(error)
            res.send(error);

        res.json(results);
    })
}

module.exports.giveExperienceByNickname = (req,res) =>{
    const sql = `UPDATE usuario SET experience WHERE nickname = ?` //experience? , userexperience? 
    const body = req.body;

    conexion.query(sql, [body.experience, body.nickname], (error, results, fields)=>{
        if(error)
            res.send(error);

        res.json(results);
    })

}