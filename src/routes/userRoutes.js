const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userIsLogged = require('../middlewares/userIsLogged');
// const registerValidations = require('../middlewares/registerMiddleware');
// const guestMiddleware = require('../middlewares/guestMiddleware');
// const userMiddleware = require('../middlewares/userMiddleware');


router.get('/login', userIsLogged, userController.login);
router.post('/login', userController.loginProcess);
router.get('/register', userIsLogged, userController.register);
router.post('/register', userController.processRegister);
router.get('/redirectUser', userController.redirectUser);
// router.get('/logout', userController.logout);

module.exports = router
