const res = require('express/lib/response');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);


module.exports.getUserExperienceByNickname = (req,res) =>{
    const sql = `SELECT experience FROM usuario WHERE nickname = ?`
    conexion.query(sql,[req.params.nickname],(error,results,fields) =>{
        if(error)
            res.send(error);

        res.json(results);
    })
}

module.exports.giveExperienceByNickname = (req,res) =>{
    const sql = `UPDATE usuario SET experience=? WHERE nickname = ?` //experience? , userexperience?  
    const sql2 = `SELECT experience FROM usuario WHERE nickname = ?`
    

    const body = req.body;

    console.log(body);


    conexion.query(sql2, [body.nickname], (error,results,fields)=>{
        
        //console.log(results);
        let currExperience = parseInt(results[0].experience);
        //console.log(currExperience);

        let updatedExperience = parseInt(body.experience) + currExperience;
        //console.log(updatedExperience);

        conexion.query(sql, [updatedExperience.toString(), body.nickname], (error, results, fields)=>{
          //  console.log(updatedExperience.toString());
            if(error)
                res.send(error);
    
            res.json(results);
        })

    })




}