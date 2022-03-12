const express = require('express');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const config = require('./config/jwt');
const logro = require('./routes/logro');
const token_login = require('./routes/token');

//const res = require('express/lib/response');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set("key", config.key);

app.use('/',logro);
app.use('/',token_login);

//Función callback -> función que se ejecuta como respuesta a un evento o acción
app.listen(port, () =>{
    console.log(`Servidor iniciado en el puerto ${port}`);
})





