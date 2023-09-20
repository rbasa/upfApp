const express = require('express');
const router = express.Router();
const validatorController = require('../controllers/validatorController');
const userLoggedAsCategory = require('../middlewares/userLoggedAsCategory');

// Validator home page
router.get('/home/:api?', userLoggedAsCategory('validator'), validatorController.home);
// Minting Request Validation
router.put('/vote/:vote/:minting_request_id/:api?', userLoggedAsCategory('validator'), validatorController.validate);
// Validator don't wants to take a case no analyse
router.put('/cancelAssigment/:minting_request_id/:api?', userLoggedAsCategory('validator'), validatorController.cancelAssigment);


module.exports = router;
