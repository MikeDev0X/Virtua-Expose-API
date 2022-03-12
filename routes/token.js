const express = require('express');
const router = express.Router();
const loginController = require('../controller/token.controller');
const middleware = require('../middleware/jwt-middleware');

router.post('/login', middleware, loginController.login);

module.exports = router;