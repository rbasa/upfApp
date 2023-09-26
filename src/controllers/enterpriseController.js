const Users = require('../models/Users');
const Unplastified_item = require('../models/Unplastified_item');
const Minting_request = require('../models/Minting_Request');
const User = require('./userController');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const controller = {
  dashboard: async (req, res) => {
    const api = req.params.api || false;
    const decodedToken = User.captureAuth(req);
    const errorMessages = req.flash('error');
    const enterpriseLogged = decodedToken
    const submitedDetails = await Users.hasSubmitedDetails(decodedToken.userId);
    const userCategory = decodedToken.userCategory
    const openMintingRequests = await Minting_request.findByEnterprise(decodedToken.userId);
    const mintingRequestsWithDetails = await Minting_request.findByEnterpriseWithDetails(decodedToken.userId);
    if (!api) {
      return res.render('enterprise/enterpriseDashboard', { enterpriseLogged, submitedDetails, openMintingRequests, mintingRequestsWithDetails, userCategory, errorMessages });
    }
    return res.json([enterpriseLogged, submitedDetails, openMintingRequests, mintingRequestsWithDetails, userCategory, errorMessages]);
  },
  details: async (req, res) => {
    const api = req.params.api || false;
    const decodedToken = User.captureAuth(req);
    const user = decodedToken.user_id
    const submitedDetails = await Users.getDetails(user);
    if (!api) {
      return res.render('enterprise/details', { user, submitedDetails });
    }
    return res.json([user, submitedDetails]);
  },
  processEnterpriseDetails: async (req, res) => {
    const api = req.params.api || false;
    const decodedToken = User.captureAuth(req);
    const user = decodedToken.userId
    await Users.submitDetails(user, req.body);
    if (!api) {
      return res.redirect('/enterprise/home');
    }
    return res.redirect('/enterprise/home/api');
  },
  newMintingRequest: async (req, res) => {
    const api = req.params.api || false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // const errorMessages = Object.values(errors.mapped()).map(error => error.msg);
      // req.flash('error', errorMessages);
      // return res.redirect('/enterprise/home');
      req.flash('error', errors.mapped());
      return res.redirect('/enterprise/home');
    }
    const minting_request_id = await Minting_request.create(req);
    if (!api) {
      return res.redirect(`/enterprise/mintingRequest/${minting_request_id}`);
    }
    return res.redirect(`/enterprise/mintingRequest/${minting_request_id}/api`);
  },
  mintingRequestDetail: async (req, res) => {
    const api = req.params.api || false;
    const token = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', ''); // Extract the token from the cookies
    console.log('jiji', token)
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const userCategory = decodedToken.userCategory
    let mintingRequestId;
    req.params.idMintingRequest ? mintingRequestId = req.params.idMintingRequest : mintingRequestId = req.session.minting_request_id;
    const unplastifiedItems = await Unplastified_item.findByMintingRequest(mintingRequestId);
    const mintingRequest = await Minting_request.findByPk(mintingRequestId);
    req.session.minting_request_id = mintingRequestId;
    const plasticItem = await Unplastified_item.listPlasticItems();
    const alternativePlasticItem = await Unplastified_item.listAlternativePlasticItems();
    const productMeasurementUnit = await Unplastified_item.listProductMeasurementUnit();
    const impactApproach = await Unplastified_item.listImpactApproach();
    if (!api) {
      return res.render('enterprise/mintingRequestDetail',
        {
          unplastifiedItems,
          mintingRequest,
          userCategory,
          plasticItem,
          alternativePlasticItem,
          productMeasurementUnit,
          impactApproach
        });
    }
    console.log('jjejeje')
    return res.json([
      unplastifiedItems,
      mintingRequest,
      userCategory,
      plasticItem,
      alternativePlasticItem,
      productMeasurementUnit,
      impactApproach
    ])
  },
  uploadUnplastifiedItem: async (req, res) => {
    const api = req.params.api || false;
    await Unplastified_item.submit(req);
    if (!api) {
      return res.redirect(`/enterprise/mintingRequest/${req.params.idMintingRequest}`);
    }
    return res.redirect(`/enterprise/mintingRequest/${req.params.idMintingRequest}/api`);
  },
  addNewUnplastifiedItem: async (req, res) => {
    const api = req.params.api || false;
    const plasticItem = await Unplastified_item.listPlasticItems();
    const alternativePlasticItem = await Unplastified_item.listAlternativePlasticItems();
    const productMeasurementUnit = await Unplastified_item.listProductMeasurementUnit();
    const impactApproach = await Unplastified_item.listImpactApproach();
    if (!api) {
      return res.render('enterprise/unplastifiedItem', { plasticItem, productMeasurementUnit, alternativePlasticItem, impactApproach, minting_request_id: req.params.idMintingRequest });
    }
    return res.json([plasticItem, productMeasurementUnit, alternativePlasticItem, impactApproach]);
  },
  editUnplastifiedItem: async (req, res) => {
    const api = req.params.api || false;
    const token = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', ''); // Extract the token from the cookies
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const userType = decodedToken.userCategory;
    switch (userType) {
      case 'enterprise':
        const minting_request = await Unplastified_item.findMintingRequest(req.params.idUnplastifiedItem);
        const status = await Minting_request.findMintingRequestStatus(minting_request.dataValues.minting_request_id);
        switch (status[0].status) {
          case 'Created':
            if (!api) {
              return res.redirect(`/enterprise/mintingRequest/${(await Unplastified_item.edit(req)).minting_request_id}`)
            }
            return res.redirect(`/enterprise/mintingRequest/${(await Unplastified_item.edit(req)).minting_request_id}/api`)
          case 'Further documentation requested':
            if (!api) {
              return res.redirect(`/enterprise/mintingRequest/${(await Unplastified_item.submitFurtherDocumentation(req)).minting_request_id}`)
            }
            return res.redirect(`/enterprise/mintingRequest/${(await Unplastified_item.submitFurtherDocumentation(req)).minting_request_id}/api`)
          default:
            // error de tipo prohibido, no deberia poder acceder a la edicion en otro estado
            console.log('************************************')
            console.log('error de tipo prohibido, no deberia poder acceder a la edicion en otro estado')
            if (!api) {
              return res.redirect('/')
            }
            return res.redirect('/api')
        }
      case 'unplastify':
        if (!api) {
          return res.redirect(`/enterprise/mintingRequest/${(await Unplastified_item.edit(req)).minting_request_id}`)
        }
        return res.redirect(`/enterprise/mintingRequest/${(await Unplastified_item.edit(req)).minting_request_id}/api`)
      default:
        if (!api) {
          return res.redirect('/')
        }
        return res.redirect('/api')
    }
  },
  deleteUnplastifiedItem: async (req, res) => {
    const api = req.params.api || false;
    const mintingRequestId = await Unplastified_item.delete(req);
    if (!api) {
      return res.redirect(`/enterprise/mintingRequest/${mintingRequestId}`)
    }
    return res.redirect(`/enterprise/mintingRequest/${mintingRequestId}/api`)
  },
  changeMintingRequestName: async (req, res) => {
    const api = req.params.api || false;
    await Minting_request.changeMintingRequestName(req);
    if (!api) {
      return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}`);
    }
    return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}/api`);
  },
  submitMintingRequest: async (req, res) => {
    const api = req.params.api || false;
    // change status to submited
    await Minting_request.updateMintingRequestStatus(req.params.minting_request_id, 'Submited');
    if (!api) {
      return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}`);
    }
    return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}/api`);
  },
  inReviewMintingRequest: async (req, res) => {
    const api = req.params.api || false;
    // change status to assigned to validator
    await Minting_request.updateMintingRequestStatus(req.params.minting_request_id, 'In Review');
    if (!api) {
      return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}`);
    }
    return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}/api`);
  }
};
module.exports = controller;
