const express = require('express');
const router = express.Router();
const validatorController = require('../controllers/validatorController');
const userNotLogged = require('../middlewares/userNotLoggedAsValidator');

router.get('/home/:api?',  userNotLogged, validatorController.home);


module.exports = router;
