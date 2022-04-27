const res = require('express/lib/response');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.insertUsuario = (req,res) =>{

    const body= req.body;
    let mensaje = "El usuario ya existe";
    const sq = `INSERT INTO usuario(realname, nickname, correo, contrasena, experience) VALUES(?,?,?,?,0)`
    const sql = `SELECT idUsuario FROM usuario WHERE nickname = ?`
    const user = req.body.nickname;
    let resultUser;

    async function Fun(){

        conexion.query(sql, [user], (error,results,fields)=>{
                

            if (error)
                res.send(error)
            else{
                
                resultUser = results[0];
                console.log("resultUser, first query");
                console.log(resultUser);

                if (resultUser == undefined){
                    mensaje = 'Usuario insertado correctamente'

                    conexion.query(sq, [body.realname, body.nickname, body.correo, body.contrasena, body.experience], (error, resultsInsert, fields)=>{

                        if(error){
                            res.send(error);
                        }
    
                        else{
                            console.log(resultUser);
                        }  
                    })
                }
                res.json({
                    mensaje
                });
            }
        })
    }
    
    Fun();

    console.log(body);
    if (mensaje==='Usuario insertado correctamente'){
        return true;         
    }
    else{
        return false;
    }
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

module.exports.removeUsers = async (req,res) =>{
    const sql = `DELETE FROM usuario WHERE idUsuario=?`;
    const reqId = req.params.id;
    const reqNum = req.params.num;

    //console.log(reqNum);

    let reqIdInt = parseInt(reqId);
    let reqIdIntToString;

    for(let x=0; x<parseInt(reqNum); x++){
        if(x!=0){
            reqIdInt = reqIdInt + 1;
        }

        reqIdIntToString = reqIdInt.toString();

        conexion.query(sql,[reqIdIntToString],(error, results, fields)=>{


            if(error)
                res.send(error)
            res.json(results);
        })
    }
}