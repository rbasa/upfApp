const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllerApi');
const userIsLogged = require('../middlewares/userIsLogged');
// const registerValidations = require('../middlewares/registerMiddleware');
// const guestMiddleware = require('../middlewares/guestMiddleware');
// const userMiddleware = require('../middlewares/userMiddleware');


// router.get('/login', userIsLogged, userController.login);
router.get('/login', userController.login);
// router.post('/login', userController.loginProcess);
router.post('/login', userController.loginProcess);
// router.get('/logout', userController.logout);
router.get('/logout', userController.logout);
// router.get('/register', userIsLogged, userController.register);
router.get('/register', userController.register);
// router.post('/register', userController.processRegister);
router.post('/register', userController.processRegister);
// router.get('/redirectUser', userController.redirectUser);
router.get('/redirectUser', userController.redirectUser);
router.get('*', (req, res) => {
  res.redirect('/');
});
module.exports = router;
