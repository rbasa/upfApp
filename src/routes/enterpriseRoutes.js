const express = require('express');
const router = express.Router();
const path = require('path');
const enterpriseController = require('../controllers/enterpriseController');
const userNotLogged = require('../middlewares/userNotLoggedAsEnterprise');
const upload = require('../middlewares/mintingUpload');

// const registerValidations = require('../middlewares/registerMiddleware');
// const guestMiddleware = require('../middlewares/guestMiddleware');
// const userMiddleware = require('../middlewares/enterpriseMiddleware');

router.get('/home', userNotLogged, enterpriseController.dashboard);
router.get('/details', userNotLogged, enterpriseController.details);
router.post('/details/:id', userNotLogged, enterpriseController.processEnterpriseDetails);
// hay que hacer un midleware para que solo se pueda renderizar si la mintingRequest del user_id
router.get('/request/:idMintingRequest', userNotLogged, enterpriseController.request);
router.get('/mintingRequest', userNotLogged, enterpriseController.mintingRequest);
router.post('/mintingRequest', userNotLogged, upload.any('before_pic','after_pic', 'video', 'technical_file', 'additional_pics'), enterpriseController.processMintingRequest);
router.put('/details', userNotLogged, enterpriseController.details);

module.exports = router
