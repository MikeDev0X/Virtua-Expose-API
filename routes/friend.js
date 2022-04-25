const express = require('express');
const router = express.Router();
const friendController = require('../controller/friend.controller');
const middleware = require('../middleware/jwt-middleware');


router.get('/getFriendsFromUser/:id', middleware, friendController.getFriendsFromUser);
router.get('/getAllFriends', middleware, friendController.getAllFriends);

module.exports = router;