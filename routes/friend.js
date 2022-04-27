const express = require('express');
const router = express.Router();
const friendController = require('../controller/friend.controller');
const middleware = require('../middleware/jwt-middleware');


router.get('/getFriendsFromId/:id', middleware, friendController.getFriendsFromUserWithId);
router.get('/getFriendsFromNickname/:nickname', middleware, friendController.getFriendsFromUserWithNickname);
router.get('/getAllFriends', middleware, friendController.getAllFriends);


module.exports = router;