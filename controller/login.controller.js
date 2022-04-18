const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
/////////
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);
////////

module.exports.login = (req,res) =>{
    const user = req.body.user;
    const password = req.body.password;
    const sql = `SELECT idUsuario FROM usuario WHERE nickname = ?`
    const sql2 = `SELECT contrasena FROM usuario WHERE nickname=?`
    let resultUser;
    let resultPassword;

    //
    let mensaje = 'Usuario y contraseña inválidos'

    ////////////////
    let token = '';

    const payload = {
        id: 1,
        user: req.body.user
    }

    console.log(req.body);

    function Fun (pw){

        conexion.query(sql, [user], (error, results, fields) =>{
            if(error)
                res.send(error);
            else{
                console.log(results[0]);
                resultUser = results[0];
    
                conexion.query(sql2, [user], (error, results2, fields) =>{

                    if(error)
                        res.send(error);
                    else{
                        resultPassword = results2[0];

                        //console.log(resultPassword.contrasena === pw);

                        console.log(resultUser);
                        console.log(resultPassword);

                        if(resultUser != undefined ){
                            if(resultPassword.contrasena === pw){

                                token = jwt.sign(payload, config.key ,{expiresIn: 7200})
                                mensaje= 'Usuario o contraseña autenticados'

                            }
                        }
                    }


                    
                    res.json({
                        mensaje,
                        token
                    })
                })
            }
        })
    }

    Fun(password);

    //passwordFun().then((user) => console.log(resultPassword.contrasena === password))

    //kiti1 = (userFun().then((user)));
    //console.log(kiti1);

    /*
    if ((userFun().then((user)))&&(passwordFun(password).then((user)))){
            console.log((userFun().then((user)))&&(passwordFun(password).then((user))))
            //passwordFun().then((user) => console.log(resultPassword.contrasena == password))
            token = jwt.sign(payload, config.key ,{expiresIn: 7200})
            mensaje= 'Usuario y contraseña autenticados'

    }

    else{
        //console.log(results);
        mensaje = "El usuario no existe!";
    }
    */

}       