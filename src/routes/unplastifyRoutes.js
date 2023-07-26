const express = require('express');
const router = express.Router();
const unplastifyController = require('../controllers/unplastifyController');
const userNotLoggedAsCategory = require('../middlewares/userLoggedAsCategory');
const mintingStatusNot = require('../middlewares/mintingStatusNotAs');
const notRegistered = require('../middlewares/userNotRegistered');
const editPermision = require('../middlewares/mintingRequestEdit');

router.get('/home/:api?', userNotLoggedAsCategory('unplastify'), unplastifyController.dashboard);
router.get('/pendingRequest/:id/:api?', userNotLoggedAsCategory('unplastify'), unplastifyController.pendingRegistration);
router.put('/approveUser/:id/:api?', userNotLoggedAsCategory('unplastify'), notRegistered, unplastifyController.aproveUser);
router.put('/standByUser/:id/:api?', userNotLoggedAsCategory('unplastify'), (req, res) => res.send('Proximamente'));
router.put('/declineUser/:id/:api?', userNotLoggedAsCategory('unplastify'), (req, res) => res.send('Proximamente'));
router.put('/assignToValidator/:minting_request_id/:api?', editPermision, userNotLoggedAsCategory('unplastify'), mintingStatusNot('Assigned'), unplastifyController.assignMintingRequestToValidator);
router.put('/updateMintingRequestStatus/:id/:status/:api?', userNotLoggedAsCategory('unplastify'), unplastifyController.processMintingRequestStatusChange);

module.exports = router;
