const express = require('express');
const router = express.Router();
const path = require('path');
const enterpriseController = require('../controllers/enterpriseController');
const { validationResult } = require('express-validator');
const userNotLoggedAsEnterprise = require('../middlewares/userNotLoggedAsEnterprise');
const userNotLogged = require('../middlewares/userNotLogged');
const editPermision = require('../middlewares/mintingRequestEdit');
const upload = require('../middlewares/mintingUpload');
const namingMintingRequest = require('../middlewares/namingMintingRequest');

// const registerValidations = require('../middlewares/registerMiddleware');
// const guestMiddleware = require('../middlewares/guestMiddleware');
// const userMiddleware = require('../middlewares/enterpriseMiddleware');
// hay que hacer un midleware para que solo se pueda renderizar si la mintingRequest del user_id

router.get('/home', userNotLoggedAsEnterprise, enterpriseController.dashboard);
router.get('/details', userNotLoggedAsEnterprise, enterpriseController.details);
router.put('/details', userNotLoggedAsEnterprise, enterpriseController.details);
router.post('/details/:id', userNotLoggedAsEnterprise, enterpriseController.processEnterpriseDetails);
router.post('/newMintingRequest', userNotLoggedAsEnterprise, namingMintingRequest, enterpriseController.newMintingRequest);
router.get('/mintingRequest/:idMintingRequest', userNotLogged, enterpriseController.mintingRequestDetail);
router.get('/addUnplastifiedItem', userNotLoggedAsEnterprise, enterpriseController.addNewUnplastifiedItem);
router.post('/newUnplastifiedItem', userNotLoggedAsEnterprise, upload.any('before_pic','after_pic', 'video', 'technical_file', 'additional_pics'), enterpriseController.uploadUnplastifiedItem);
router.put('/editUnplastifiedItem/:idUnplastifiedItem', userNotLoggedAsEnterprise, editPermision, editPermision, enterpriseController.editUnplastifiedItem);
router.delete('/deleteUnplastifiedItem/:idUnplastifiedItem', userNotLoggedAsEnterprise, editPermision, editPermision, enterpriseController.deleteUnplastifiedItem);
router.put('/changeMintingRequestName/:minting_request_id', userNotLoggedAsEnterprise, enterpriseController.changeMintingRequestName);
router.put('/submitMintingRequest/:minting_request_id', userNotLoggedAsEnterprise, enterpriseController.submitMintingRequest);



router.get('*', (req, res) => {
  res.redirect('/');
  
});
module.exports = router;
