const express = require('express');
const router = express.Router();
const validatorController = require('../controllers/validatorController');
const userLoggedAsCategory = require('../middlewares/userLoggedAsCategory');

router.get('/home/:api?', userLoggedAsCategory('validator'), validatorController.home);
router.put('/validate/:minting_request_id/:api?', userLoggedAsCategory('validator'), validatorController.validate);


module.exports = router;
