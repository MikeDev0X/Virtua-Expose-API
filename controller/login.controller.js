const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
/////////
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);
////////77

module.exports.login = (req,res) =>{
    const user = req.body.user;
    const password = req.body.password;
    const sql = `SELECT idUsuario FROM usuario WHERE nickname=?`
    let gatoControl = false;

    //
    const jsonObj = '[]'

    let mensaje = 'Usuario y contraseña inválidos'
    ////////////////
    let token = '';

    const payload = {
        id: 1,
        user: req.body.user
    }

    console.log(req.body);

    conexion.query(sql, [user], (error, results, fields) =>{
        if(error)
            res.send(error);
        else{
            //console.log(results.affectedRows);
            if (results[0] != undefined){
                console.log(results);
                token = jwt.sign(payload, config.key ,{expiresIn: 7200})
                mensaje= 'Usuario y contraseña autenticados'
                gatoControl = true;

            }
            else{
                console.log(results);
                mensaje = "El usuario no existe!";
                gatoControl = false;

            }
            
        }

        res.json({
            mensaje,
            token
            })

    })
}       