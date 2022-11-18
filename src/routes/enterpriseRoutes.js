const express = require('express');
const router = express.Router();
const enterpriseController = require('../controllers/enterpriseController');
const userNotLogged = require('../middlewares/userNotLoggedAsEnterprise');
// const registerValidations = require('../middlewares/registerMiddleware');
// const guestMiddleware = require('../middlewares/guestMiddleware');
// const userMiddleware = require('../middlewares/enterpriseMiddleware');
// /enterprise/mintingRequest

router.get('/home', userNotLogged, enterpriseController.dashboard);
router.get('/details', userNotLogged, enterpriseController.details);
router.get('/mintingRequest', userNotLogged, enterpriseController.mintingRequest);
// router.get('/mintingRequest', userNotLogged, enterpriseController.mintingRequest);
router.post('/details', userNotLogged, enterpriseController.submitDetails);
router.put('/details', userNotLogged, enterpriseController.details);
// router.post('/login', userController.loginProcess);
// router.get('/register', userController.register);
// router.post('/register', userController.processRegister);
// router.get('/profile', userController.profile);
// router.get('/logout', userController.logout);

module.exports = router
