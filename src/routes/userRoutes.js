const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userIsLogged = require('../middlewares/userIsLogged');
// const registerValidations = require('../middlewares/registerMiddleware');
// const guestMiddleware = require('../middlewares/guestMiddleware');
// const userMiddleware = require('../middlewares/userMiddleware');


router.get('/login/:api?', userIsLogged, userController.login);
router.post('/login/:api?', userController.loginProcess);
router.get('/logout/:api?', userController.logout);
router.get('/register/:api?', userIsLogged, userController.register);
router.post('/register/:api?', userController.processRegister);
router.get('/redirectUser/:api?', userController.redirectUser);

module.exports = router;
