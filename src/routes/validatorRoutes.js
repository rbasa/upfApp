const express = require('express');
const router = express.Router();
const unplastifyController = require('../controllers/unplastifyController');
const userNotLogged = require('../middlewares/userNotLoggedAsUnplastify');

router.get('/home', userNotLogged, (req, res)=>{return res.send('asd')});
router.get('/pendingRequest/:id', userNotLogged, unplastifyController.pendingRegistrations);
router.put('/approveUser/:id', userNotLogged, unplastifyController.aproveUser);
router.put('/standByUser/:id', userNotLogged, (req,res)=> res.send('Proximamente'));
router.put('/declineUser/:id', userNotLogged, (req,res)=> res.send('Proximamente'));

module.exports = router;
