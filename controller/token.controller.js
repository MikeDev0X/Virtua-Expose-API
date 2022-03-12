const jwt = require('jsonwebtoken');
const config = require('./config/jwt');

module.exports.login = (req,res) =>{
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
}