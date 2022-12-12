const express = require('express');
const router = express.Router();
const path = require('path');
const enterpriseController = require('../controllers/enterpriseController');
const userNotLogged = require('../middlewares/userNotLoggedAsEnterprise');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname, '/../public/enterpriseDocumentation'))
  },
  filename: (req, file, cb)=>{

    const newFileName='user-'+req.session.userLogged.user_id+'-'+file.fieldname+Date.now()+path.extname(file.originalname);
    cb(null, newFileName)
  }
})
const upload = multer({storage: storage})
// const registerValidations = require('../middlewares/registerMiddleware');
// const guestMiddleware = require('../middlewares/guestMiddleware');
// const userMiddleware = require('../middlewares/enterpriseMiddleware');

router.get('/home', userNotLogged, enterpriseController.dashboard);
router.get('/details', userNotLogged, enterpriseController.details);
router.get('/mintingRequest', userNotLogged, enterpriseController.mintingRequest);
// router.post('/mintingRequest', userNotLogged, (req,res)=>{
//   const respuesta =(req)
//   res.send(req.file)});
const mintingUpload=upload.fields([{
  name:'before_pic'
  },{
  name:'after_pic'
  }])
router.post('/mintingRequest', userNotLogged, mintingUpload,enterpriseController.processMintingRequest);
router.put('/details', userNotLogged, enterpriseController.details);
// router.post('/login', userController.loginProcess);
// router.get('/register', userController.register);
// router.post('/register', userController.processRegister);
// router.get('/profile', userController.profile);
// router.get('/logout', userController.logout);

module.exports = router
