const jwt = require('jsonwebtoken');
////////
const config = require('../config/jwt');
////////77

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

    console.log(user,password);

    if(user==="Mike" && password==="123"){
        token = jwt.sign(payload, config.key ,{expiresIn: 7200})
        mensaje= 'Usuario y contraseña autenticados'
    }

    res.json({
        mensaje,
        token
    })
}   