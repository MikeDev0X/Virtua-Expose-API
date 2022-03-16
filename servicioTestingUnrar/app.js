const express = require('express');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const config = require('./config/jwt');
//const res = require('express/lib/response');


////////////////////////////mysql//////////////////////////
const mysql = require('mysql');
const mysqlConfig = require('./helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);
//////////////////////////////////////////////////////////

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set("key", config.key);

///////////////////////////
const middleware = express.Router();
middleware.use((req,res,next) =>{
    const token = req.headers['x-access-token']
    if (token){
        const decode = jwt.verify(token, app.get('key'), (err, decoded)=>{
            if(err)
                return res.status(403).json({mensaje: "Token inválido"})
            else
                next();
        })
    }
    else{
        return res.status(401).send({mensaje: 'Token no proporcionado'});
    }
})
////////////////////////

//path, función callback
app.get('/usuario', middleware,  (req,res) =>{
    res.json({
        mensaje: 'It works!'
    })
})

app.get('/logros', (req,res) =>{
    const sql = `SELECT * FROM logro`;
        conexion.query(sql,(error,results,fields) =>{
            if(error)
                res.send(error);

            res.json(results);
        })
})

app.get('/logro:id', (req,res) =>{
    const sql = `SELECT * FROM logro WHERE idLogro=?`;
        conexion.query(sql,[req.params.id],(error,results,fields) =>{
            if(error)
                res.send(error);

            res.json(results);
        })
})

app.post('/login',(req,res) =>{
    const user = req.body.user;
    const password = req.body.password;

    let mensaje = 'Usuario y contraseña inválidos'
    ////////////////
    let token = '';


    const payload = {
        id: 1,
        user: req.body.user
    }

    if(user==="Mike" && password==="123"){
        token = jwt.sign(payload, app.get("key"),{expiresIn: 7200})
        mensaje= 'Usuario y contraseña autenticados'
    }

    res.json({
        mensaje: mensaje,
        token: token
    })


})

app.post('/logro',(req,res)=>{
    const body = req.body;
    const sql = `INSERT INTO logro(id,nombre,descripcion) VALUES(?,?,?)`

    conexion.query(sql, [...body], (error, results, fields)=>{
        if(error)
            res.send(error);

        res.json(results);
    })
})

app.put('/logro',(req,res)=>{
    const body = req.body;
    const sql = `UPDATE logro SET nombre=?, descripcion=? WHERE idLogro = ? `;

    conexion.query(sql, [...body], (error, results, fields)=>{
        if(error)
            res.send(error);

        res.json(results);
    })
})

app.delete('/logro',(req,res)=>{
    const sql = `DELETE FROM logro WHERE idLogro=?`

    conexion.query(sql, [req.params.id], (error, results, fields)=>{
        if(error)
            res.send(error);

        res.json(results);
    })
})



//Función callback -> función que se ejecuta como respuesta a un evento o acción
app.listen(port, () =>{
    console.log(`Servidor iniciado en el puerto ${port}`);
})


