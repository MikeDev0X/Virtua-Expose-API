const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);
const res = require('express/lib/response');

module.exports.getFriendsFromUserWithId = (req,res) =>{
    const sql = `SELECT nickname FROM usuario WHERE idUsuario IN (SELECT idUsuario2 FROM amigos WHERE idUsuario1 = ?)`;
        conexion.query(sql,[req.params.id],(error,results,fields)=>{
            if(error)
                res.send(error);

            res.json(results);
        })
}

module.exports.getFriendsFromUserWithNickname = (req,res) =>{
    const sql = `SELECT nickname FROM usuario WHERE idUsuario IN (SELECT idUsuario2 FROM amigos WHERE idUsuario1 IN (SELECT idUsuario FROM usuario WHERE nickname = ?))`
        conexion.query(sql,[req.params.nickname],(error,results,fields)=>{
            if(error)
                res.send(error);

            res.json(results);
        })

}

module.exports.addFriends = (req,res) =>{
    const sql = `SELECT idUsuario FROM usuario WHERE nickname = ?`; //checks if nickname from friend exists
    const sql2 = `INSERT INTO amigos (idUsuario1, idUsuario2) VALUES(?,?)`;
    const sql3 = `INSERT INTO amigos (idUsuario1, idUsuario2)  VALUES(?,?) `;
    const sql4 = `SELECT idUsuario1 FROM amigos WHERE idUsuario1 = ? AND idUsuario2 = ?`;
    const sql5 = `SELECT idUsuario FROM usuario WHERE idUsuario = ?` //checks if idUsuario1 exists


    const idUsuario1 = req.params.idUsuario1;
    const friend = req.params.nickname;
    let results2;
    let idUsuario2;
    let mensaje =  "User doesn't exist";
    let decoy;
    let id1exists;

    async function fun(){


    conexion.query(sql, [friend], (error,results,fields)=>{

        if (error)
            res.send(error);
        else{
            results2 = results[0]; //idUsuario- friend

            conexion.query(sql5, [idUsuario1],(error,results,fields)=>{
                if(error)
                    res.send(error);


                id1exists = results[0];


                if(id1exists == undefined){
                    mensaje = "user's Id doesn't exist";
                    return res.json({
                        mensaje
                    }) 
                }
                else{

                    if(results2 != undefined)
                    {
                        idUsuario2 = results2.idUsuario;
        
                        conexion.query(sql4, [idUsuario1, idUsuario2.toString()],(error,results,fields)=>{
                            
                            if(error)
                                res.send(error);
                            else{
                                decoy = results[0];
                                console.log("decoy: ");
                                console.log(decoy);
        
                                if(decoy == undefined){
                                    mensaje = "Friend added correctly";
        
                                    conexion.query(sql3, [idUsuario1, idUsuario2.toString()],(error,results,fields)=>{
                            
                                        if(error){
                                            res.send(error)
                                        }
                                        
                                    })
                    
                                    conexion.query(sql2, [idUsuario2.toString(), idUsuario1],(error,results,fields)=>{
                                    
                                        if(error){
                                            res.send(error);
                                        }
                                    
                                    })
                                }
                                else{
                                    mensaje = "User already have that friend!"
                                }
        
                            }
                            //
                            return res.json({
                                mensaje
                            })
                        })
        
        
                    }
                    else{
                        return res.json({
                            mensaje
                        })
                    }

                }

            })            
        }

        })

    }
    fun();
}

module.exports.getAllFriends = (req,res) =>{
    const sql = `SELECT * FROM amigos`;
        conexion.query(sql, (error,results,fields)=>{
            if(error)
                res.send(error);

            res.json(results);
        })
}

