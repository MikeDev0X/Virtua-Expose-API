const express = require('express');
const router = express.Router();
const experienceController = require('../controller/experienceController'); //still modify
const middleware = require('../middleware/jwt-middleware');


router.get('/getExperience/:nickname', middleware, experienceController.getUserExperienceByNickname);
router.put('/addExperience', middleware, experienceController.giveExperienceByNickname); 

module.exports = router;

