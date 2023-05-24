const express = require('express');
const router = express.Router();
const validatorController = require('../controllers/validatorControllerApi');
const userNotLogged = require('../middlewares/userNotLoggedAsValidator');

// router.get('/home',  userNotLogged, validatorController.home);
router.get('/home', validatorController.home);


module.exports = router;
