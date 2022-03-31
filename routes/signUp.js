const express = require('express');
const router = express.Router();
const signUpController = require('../controller/signUpController.js');

router.post('/signUp', signUpController.insertUsuario);
router.get('/getUsuarios', signUpController.getUsuarios);

module.exports = router;
