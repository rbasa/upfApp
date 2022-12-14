const express = require('express');
const router = express.Router();
const unplastifyController = require('../controllers/unplastifyController');
const userNotLogged = require('../middlewares/userNotLoggedAsUnplastify');

router.get('/home', userNotLogged, unplastifyController.dashboard);
router.get('/pendingRequest/:id', userNotLogged, unplastifyController.pendingRegistrations);
router.put('/approveUser/:id', userNotLogged, unplastifyController.aproveUser);
router.put('/standByUser/:id', userNotLogged, (req,res)=> res.send('Proximamente'));
router.put('/declineUser/:id', userNotLogged, (req,res)=> res.send('Proximamente'));

router.put('/updateMintingRequestStatus/:id/:status', userNotLogged, unplastifyController.processMintingRequestStatusChange);
// router.put('/setMintingRequestAproved/:id', userNotLogged, unplastifyController.setMintRequestAsAproved);
// router.put('/setMintingRequestRequestFurtherDocumentation/:id', userNotLogged, unplastifyController.setMintRequestRequestFurtherInfo);
// router.put('/setMintingRequestInStandBy/:id', userNotLogged, unplastifyController.setMintRequestInStandBy);
// router.put('/setMintingRequestDeclined/:id', userNotLogged, unplastifyController.setMintRequestInDeclined);
// router.get('/approveEnterprise/:id', userNotLogged, unplastifyController.aproveEnterprise);
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
