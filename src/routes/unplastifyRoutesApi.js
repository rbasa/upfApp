const express = require('express');
const router = express.Router();
const unplastifyController = require('../controllers/unplastifyControllerApi');
const userNotLogged = require('../middlewares/userNotLoggedAsUnplastify');
const notRegistered = require('../middlewares/userNotRegistered');
const editPermision = require('../middlewares/mintingRequestEdit');

// router.get('/home', userNotLogged, unplastifyController.dashboard);
router.get('/home', unplastifyController.dashboard);
// router.get('/pendingRequest/:id', userNotLogged, unplastifyController.pendingRegistrations);
router.get('/pendingRequest/:id', unplastifyController.pendingRegistrations);
// router.put('/approveUser/:id', userNotLogged, notRegistered, unplastifyController.aproveUser);
router.put('/approveUser/:id', unplastifyController.aproveUser);
// router.put('/standByUser/:id', userNotLogged, (req,res)=> res.send('Proximamente'));
router.put('/standByUser/:id', (req,res)=> res.send('Proximamente'));
// router.put('/declineUser/:id', userNotLogged, (req,res)=> res.send('Proximamente'));
router.put('/declineUser/:id', (req,res)=> res.send('Proximamente'));
// router.put('/assignToValidator/:minting_request_id', editPermision, userNotLogged, unplastifyController.assignMintingRequestToValidator);
router.put('/assignToValidator/:minting_request_id', unplastifyController.assignMintingRequestToValidator);
// router.put('/updateMintingRequestStatus/:id/:status', userNotLogged, unplastifyController.processMintingRequestStatusChange);
router.put('/updateMintingRequestStatus/:id/:status', unplastifyController.processMintingRequestStatusChange);

module.exports = router;
