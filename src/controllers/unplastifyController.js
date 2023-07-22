const Users = require('../models/Users');
const Unplastified_item = require('../models/Unplastified_item');
const Minting_request = require('../models/Minting_Request');
const Validator = require('../models/Validator');
const jwt = require('jsonwebtoken');

const controller = {
  dashboard: async (req, res) => {
    const api = req.params.api || false;
    const token = req.cookies.token; // Extract the token from the cookies
    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const users = await Users.unregisteredList();
    const openMintingRequests = await Minting_request.findAllMintingRequest();
    const openMintingRequestsWithDetails = await Minting_request.findAllWithDetails();
    const userCategory = decodedToken.userCategory;
    if (!api) {
      return res.render('unplastify/upfDashboard', { users, openMintingRequests, openMintingRequestsWithDetails, userCategory });
    }
    return res.json([users, openMintingRequests, openMintingRequestsWithDetails, userCategory]);
  },
  pendingRegistrations: async (req, res) => {
    const api = req.params.api || false;
    const user = await Users.getUserAndCategory(req.params.id);
    switch (user.category.user_category) {
      case 'enterprise':
        const enterprise = await Users.getFullEnterpriseDetails(user.user_id)
        if (!api) {
          return res.render('unplastify/upfEnterprisePendingRegistrations', { user, enterprise });
        }
        return res.json([user, enterprise]);
      case 'validator':
        if (!api) {
          return res.render('unplastify/upfEnterprisePendingRegistrations', { user });
        }
        return res.json(user);
      case 'unplastify':
        if (!api) {
          return res.render('unplastify/upfEnterprisePendingRegistrations', { user });
        }
        return res.json(user);
      default:
        if (!api) {
          return res.send('user.category.id');
        }
        return res.json('user.category.id');
    }
  },
  aproveUser: async (req, res) => {
    const api = req.params.api || false;
    await Users.approveUser(req.params.id);
    if (!api) {
      return res.redirect('/unplastify/home');
    }
    return res.redirect('/unplastify/home/api');
  },
  selectRandomValidators: async (count) => {
    const api = req.params.api || false;
    const allValidators = await Users.listUserByCategory('validator')
    const totalValidators = allValidators.length;
    const selectedValidators = [];

    if (count >= totalValidators) {
      // Add all validators to the selected list
      allValidators.forEach(validator => {
        selectedValidators.push(validator.user_id);
      });
    } else {
      // Randomly select 'count' number of validators
      while (selectedValidators.length < count) {
        const randomIndex = Math.floor(Math.random() * totalValidators);
        const randomValidator = allValidators[randomIndex];

        if (!selectedValidators.includes(randomValidator.user_id)) {
          selectedValidators.push(randomValidator.user_id);
        }
      }
    }
    //unfinished method
    return selectedValidators;
  },
  assignMintingRequestToValidator: async (req, res) => {
    const api = req.params.api || false;
    // randomly assign validator
    try {
      const amountValidatorsAssigned = await Validator.assignValidators(req.params.minting_request_id, parseInt(req.body.validatorQuantity))
      await Minting_request.updateMintingRequestStatus(req.params.minting_request_id, 'Assigned');
    } catch (error) {
      console.log(error)
    }
    return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}`);
  },
  processMintingRequestStatusChange: async (req, res) => { // should change minting status, not unplastified item
    const api = req.params.api || false;
    const status = await Minting_request.getStatus(req.params.status);

    if (status) {
      await Minting_request.updateMintingRequestStatus(req.params.id, req.params.status);
      if (!api) {
        return res.redirect('/unplastify/home');
      }
      return res.redirect('/unplastify/home/api');
    }
    if (!api) {
      return res.redirect('users/redirect');
    }
    return res.redirect('users/redirect/api');
  },
};
module.exports = controller;
