const express = require('express');
const router = express.Router();
const chat = require('../models/Chat')
const userNotLogged = require('../middlewares/userNotLogged');
const jwt = require('jsonwebtoken');
// build middleware to make enterprice chat only on its mintingRequests
// build middleware to make validators chat only on its mintingRequests


router.post('/:api?', userNotLogged, async (req, res) => {
  let decodedToken
  if (req.cookies && req.cookies.token) {
    decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY_JWT);
  }
  await chat.createNewMsg(req, decodedToken)
  return res.redirect(`/enterprise/mintingRequest/${req.session.minting_request_id}`)
});

module.exports = router;
