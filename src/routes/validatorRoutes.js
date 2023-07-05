const express = require('express');
const router = express.Router();
const validatorController = require('../controllers/validatorController');
const userNotLoggedAsCategory = require('../middlewares/userLoggedAsCategory');

router.get('/home/:api?', userNotLoggedAsCategory('validator'), validatorController.home);


module.exports = router;
