const express = require('express');
const router = express.Router();
const enterpriseController = require('../controllers/enterpriseController');
const { validationResult } = require('express-validator');
const userNotLoggedAsCategory = require('../middlewares/userLoggedAsCategory');
const userNotLogged = require('../middlewares/userNotLogged');
const editPermision = require('../middlewares/mintingRequestEdit');
const upload = require('../middlewares/mintingUpload');
const namingMintingRequest = require('../middlewares/namingMintingRequest');
// hay que hacer un midleware para que solo se pueda renderizar si la mintingRequest es del user_id

router.get('/home/:api?', userNotLoggedAsCategory('enterprise'), enterpriseController.dashboard);
//two different routes with same controller method: check
router.get('/details/:api?', userNotLoggedAsCategory('enterprise'), enterpriseController.details);
router.put('/details/:api?', userNotLoggedAsCategory('enterprise'), enterpriseController.details);
router.post('/details/:id/:api?', userNotLoggedAsCategory('enterprise'), enterpriseController.processEnterpriseDetails);
router.post('/newMintingRequest/:api?', userNotLoggedAsCategory('enterprise'), namingMintingRequest, enterpriseController.newMintingRequest);
router.get('/mintingRequest/:idMintingRequest/:api?', userNotLogged, enterpriseController.mintingRequestDetail);
router.get('/addUnplastifiedItem/:api?', userNotLoggedAsCategory('enterprise'), enterpriseController.addNewUnplastifiedItem);
router.post('/newUnplastifiedItem/:api?', userNotLoggedAsCategory('enterprise'), upload.any('before_pic', 'after_pic', 'video', 'technical_file', 'additional_pics'), enterpriseController.uploadUnplastifiedItem);
router.put('/editUnplastifiedItem/:idUnplastifiedItem/:api?', userNotLogged, editPermision, upload.any('before_pic', 'after_pic', 'video', 'technical_file', 'additional_pics'), enterpriseController.editUnplastifiedItem);
router.delete('/deleteUnplastifiedItem/:idUnplastifiedItem/:api?', userNotLoggedAsCategory('enterprise'), editPermision, editPermision, upload.any('additional_documents'), enterpriseController.deleteUnplastifiedItem);
router.put('/changeMintingRequestName/:minting_request_id/:api?', userNotLoggedAsCategory('enterprise'), editPermision, enterpriseController.changeMintingRequestName);
router.put('/submitMintingRequest/:minting_request_id/:api?', editPermision, enterpriseController.submitMintingRequest);
// router.put('/assignToValidator/:minting_request_id', editPermision, userNotLoggedAsUnplastify, unplastifyController.assignMintingRequestToValidator);
router.put('/inReview/:minting_request_id/:api?', editPermision, userNotLoggedAsCategory('unplastify'), enterpriseController.inReviewMintingRequest);
router.get('*', (req, res) => {
  res.redirect('/');
});
module.exports = router;
