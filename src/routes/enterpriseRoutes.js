const express = require('express');
const router = express.Router();
const path = require('path');
const enterpriseController = require('../controllers/enterpriseController');
const userNotLogged = require('../middlewares/userNotLoggedAsEnterprise');
const editPermision = require('../middlewares/mintingRequestEdit');
const upload = require('../middlewares/mintingUpload');

// const registerValidations = require('../middlewares/registerMiddleware');
// const guestMiddleware = require('../middlewares/guestMiddleware');
// const userMiddleware = require('../middlewares/enterpriseMiddleware');
// hay que hacer un midleware para que solo se pueda renderizar si la mintingRequest del user_id

router.get('/home', userNotLogged, enterpriseController.dashboard);
router.get('/details', userNotLogged, enterpriseController.details);
router.put('/details', userNotLogged, enterpriseController.details);
router.post('/details/:id', userNotLogged, enterpriseController.processEnterpriseDetails);
router.post('/newMintingRequest', userNotLogged, enterpriseController.newMintingRequest);
router.get('/mintingRequest/:idMintingRequest', userNotLogged, enterpriseController.mintingRequestDetail);
router.get('/addUnplastifiedItem', userNotLogged, enterpriseController.addNewUnplastifiedItem);
router.post('/newUnplastifiedItem', userNotLogged, upload.any('before_pic','after_pic', 'video', 'technical_file', 'additional_pics'), enterpriseController.uploadUnplastifiedItem);
router.put('/editUnplastifiedItem/:idUnplastifiedItem', userNotLogged, editPermision, editPermision, enterpriseController.editUnplastifiedItem);
router.put('/submitMintingRequest/:minting_request_id', userNotLogged, enterpriseController.submitMintingRequest);



router.get('*', (req, res) => {
  res.redirect('/'); // Redirect to your home page URL
});
module.exports = router;
