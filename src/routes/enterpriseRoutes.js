const express = require('express');
const router = express.Router();
const path = require('path');
const enterpriseController = require('../controllers/enterpriseController');
const { validationResult } = require('express-validator');
const userNotLoggedAsEnterprise = require('../middlewares/userNotLoggedAsEnterprise');
const userNotLoggedAsUnplastify = require('../middlewares/userNotLoggedAsUnplastify');
const userNotLogged = require('../middlewares/userNotLogged');
const editPermision = require('../middlewares/mintingRequestEdit');
const upload = require('../middlewares/mintingUpload');
const namingMintingRequest = require('../middlewares/namingMintingRequest');
// hay que hacer un midleware para que solo se pueda renderizar si la mintingRequest del user_id

router.get('/home', userNotLoggedAsEnterprise, enterpriseController.dashboard);
router.get('/details', userNotLoggedAsEnterprise, enterpriseController.details);
router.put('/details', userNotLoggedAsEnterprise, enterpriseController.details);
router.post('/details/:id', userNotLoggedAsEnterprise, enterpriseController.processEnterpriseDetails);
router.post('/newMintingRequest', userNotLoggedAsEnterprise, namingMintingRequest, enterpriseController.newMintingRequest);
router.get('/mintingRequest/:idMintingRequest', userNotLogged, enterpriseController.mintingRequestDetail);
router.get('/addUnplastifiedItem', userNotLoggedAsEnterprise, enterpriseController.addNewUnplastifiedItem);
router.post('/newUnplastifiedItem', userNotLoggedAsEnterprise, upload.any('before_pic','after_pic', 'video', 'technical_file', 'additional_pics'), enterpriseController.uploadUnplastifiedItem);
router.put('/editUnplastifiedItem/:idUnplastifiedItem', userNotLogged, editPermision, enterpriseController.editUnplastifiedItem);
router.delete('/deleteUnplastifiedItem/:idUnplastifiedItem', userNotLoggedAsEnterprise, editPermision, editPermision, enterpriseController.deleteUnplastifiedItem);
router.put('/changeMintingRequestName/:minting_request_id', userNotLoggedAsEnterprise, enterpriseController.changeMintingRequestName);
router.put('/submitMintingRequest/:minting_request_id', editPermision, enterpriseController.submitMintingRequest);
router.put('/assignToValidator/:minting_request_id', editPermision, userNotLoggedAsUnplastify, enterpriseController.assignMintingRequestToValidator);
router.put('/inReview/:minting_request_id', editPermision, userNotLoggedAsUnplastify, enterpriseController.inReviewMintingRequest);
router.get('*', (req, res) => {
  res.redirect('/');
  
});
module.exports = router;
