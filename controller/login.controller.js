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

    function userFun(){
        return new Promise ((resolve, reject) =>{

            conexion.query(sql, [user], (error, results, fields) =>{
                if(error)
                    res.send(error);
                else{
                    //console.log(results[0]);
                    resultUser = results[0];
                    resolve(resultUser);
                }
            })
        })
    }

    function passwordFun(pw){
        return new Promise ((resolve, reject) =>{

            conexion.query(sql2, [user], (error, results2, fields) =>{
                if(error)
                    res.send(error);
                else{
                    //console.log(results2[0]);
                    resultPassword = results2[0];

                    if(resultPassword.contrasena == pw){
                        resolve(resultPassword);
                    }
                    else{
                        return Promise.resolve(false);
                        reject("password doesn't match");
                    }
                }
            })
        })
    }

    const getPasswordFun = async () => {
        const kiti1 = await passwordFun(password);
        return kiti1;
    }

    console.log("KITI1: ");
    console.log(getPasswordFun);


    //passwordFun().then((user) => console.log(resultPassword.contrasena === password))

    //kiti1 = (userFun().then((user)));
    //console.log(kiti1);


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

    res.json({
        mensaje,
        token
    })

}       