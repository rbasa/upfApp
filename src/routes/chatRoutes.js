const express = require('express');
const router = express.Router();
const chat = require('../models/Chat')
const userNotLogged = require('../middlewares/userNotLogged');

// build middleware to make enterprice chat only on its mintingRequests
// build middleware to make validators chat only on its mintingRequests
// build chat model

router.post('/', userNotLogged, async (req, res)=>{
  await chat.createNewMsg(req)
  return res.redirect(`/enterprise/mintingRequest/${req.session.minting_request_id}`)
});

module.exports = router;
