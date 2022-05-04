const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
/////////
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);
const crypto = require('crypto');
////////

module.exports.login = (req,res) =>{

    const user = req.body.user;
    const password = req.body.password;
    const sql = `SELECT idUsuario FROM usuario WHERE nickname = ?`
    //const sql2 = `SELECT SHA2(contrasena,224) FROM usuario WHERE nickname=?`
    const sql2 = `SELECT contrasena FROM usuario WHERE nickname=? `

    //const sql3 = `SELECT contrasena FROM usuario WHERE contrasena = SHA2(?,224)`
    let idUsuario;
    let resultUser;
    let resultPassword;

    let mensaje = 'Usuario o contraseña inválidos' //mensaje updated

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
                //console.log(results[0]); //undefined
                if(results[0] != undefined){

                    resultUser = results[0];
                    idUsuario = resultUser.idUsuario;
        
                    conexion.query(sql2, [user], (error, results2, fields) =>{
    
                        if(error)
                            res.send(error);
                        else{
                            resultPassword = results2[0];

                            //////////7
                            let pwd = pw;
                            pwd = crypto.createHash('sha224')
                            .update(pwd)
                            .digest('hex');
                            console.log(pwd);

                            ///////////

                            //56
                            //16

                            //console.log(resultPassword);
        
                            //console.log(resultUser);
    
                            if(resultUser != undefined ){
                                console.log(resultPassword);
    
                                if(resultPassword.contrasena === pwd){
    
                                    token = jwt.sign(payload, config.key ,{expiresIn: 7200})
                                    mensaje= 'Usuario o contraseña autenticados'
    
                                }
                            }
                        }
                        
                        res.json({
                            mensaje,
                            token,
                            idUsuario
                        })
                    })

                }
                else{
                    res.json({
                        mensaje
                    })
                }

            }
        })
    }

    Fun(password);
}