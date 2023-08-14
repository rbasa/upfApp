const Users = require('../models/Users');
const Unplastified_item = require('../models/Unplastified_item');
const Minting_request = require('../models/Minting_Request');
const Validator = require('../models/Validator');
const jwt = require('jsonwebtoken');

const controller = {
  home: async (req, res) => {
    const api = req.params.api || false;
    const token = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', ''); // Extract the token from the cookies
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const userCategory = decodedToken.userCategory;
    const openMintingRequests = await Minting_request.findByValidator(decodedToken.userId);
    if (!api) {
      return res.render('validator/validatorDashboard', { openMintingRequests, userCategory });
    }
    return res.json([openMintingRequests, userCategory]);
  },
  validate: async (req, res) => {
    const api = req.params.api || false;
    const token = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', ''); // Extract the token from the cookies
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const userCategory = decodedToken.userCategory;
    const vote = req.params.vote;
    try {
      // update validation_tracking table
      await Validator.changeStatus(req.params.minting_request_id, decodedToken.userId, vote);
    } catch (error) {
      console.log(error)
      if (!api) {
        return res.redirect('/validator/home');
      }
      return res.status(400).json({ message: `Minting Request coudn't be updated as ${vote}` });
    }
    try {
      // check if all votes are Approved, then should change minting request status
      const [allStatus] = await Validator.obtainAllStatus(req.params.minting_request_id);
      if (allStatus.every(status => status.status === vote)) {
        await Minting_request.updateMintingRequestStatus(req.params.minting_request_id, vote);
      }
    } catch (error) {
      console.log(error)
    }
    // handle redirections and response
    if (!api) {
      return res.redirect('/validator/home');
    }
    return res.status(200).json({ message: `Validation updated as ${vote}` });
  },
  cancelAssigment: async (req, res) => {
    const api = req.params.api || false;
    const token = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', ''); // Extract the token from the cookies
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
    try {
      // update validation_tracking table
      await Validator.changeStatus(req.params.minting_request_id, decodedToken.userId, 'Canceled');
    } catch (error) {
      console.log(error)
      if (!api) {
        return res.redirect('/validator/home');
      }
      return res.status(400).json({ message: `Minting Request assignation coudn't be Canceled` });
    }
    try {
      // Should re assign its place to other validator
      //
      } catch (error) {
      console.log(error)
    }
    // handle redirections and response
    if (!api) {
      return res.redirect('/validator/home');
    }
    return res.status(200).json({ message: `Validation updated as ${vote}` });
  }
};
module.exports = controller;
