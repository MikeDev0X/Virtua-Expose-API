const express = require('express');
const res = require('express/lib/response');
const config = require('./config/jwt');
const logro = require('./routes/logro');
const login = require('./routes/token');

//const res = require('express/lib/response');

////////////////////// token.controller.js
////////////////////// token.js
const router = express.Router();
////////////////////////


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set("key", config.key);

app.use('/',logro);

app.use('/',login);

//Función callback -> función que se ejecuta como respuesta a un evento o acción
app.listen(port, () =>{
    console.log(`Servidor iniciado en el puerto ${port}`);
})


///////////////////////////////////// login -> removed function


