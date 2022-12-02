const express = require('express');
const router = express.Router();
const unplastifyController = require('../controllers/unplastifyController');
const userNotLogged = require('../middlewares/userNotLoggedAsUnplastify');

router.get('/home', userNotLogged, unplastifyController.dashboard);
router.get('/pendingRequest/:id', userNotLogged, unplastifyController.pendingRegistrations);
router.put('/approveEnterprise/:id', userNotLogged, unplastifyController.aproveEnterprise);
// router.get('/details', userNotLogged, enterpriseController.details);
// router.get('/mintingRequest', userNotLogged, enterpriseController.mintingRequest);
// router.post('/details', userNotLogged, enterpriseController.submitDetails);
// router.put('/details', userNotLogged, enterpriseController.details);
// router.post('/login', userController.loginProcess);
// router.get('/register', userController.register);
// router.post('/register', userController.processRegister);
// router.get('/profile', userController.profile);
// router.get('/logout', userController.logout);

module.exports = router
