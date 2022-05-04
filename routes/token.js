const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.controller');
//const middleware = require('../middleware/jwt-middleware');

router.post('/login', loginController.login);
router.put('/updatePassword/:contrasena/:idUsuario', loginController.updatePassword);

module.exports = router;