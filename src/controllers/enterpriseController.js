const path = require('path');
const Users = require('../models/Users');
const Minting_Request = require('../models/Minting_Request');
const bcryptjs = require('bcryptjs');
const Plastic_item = require('../../database/models/Plastic_item');


const controller = {
  dashboard: async (req, res) => {
    const enterpriseLogged = req.session.userLogged;
    const submitedDetails = await Users.hasSubmitedDetails(req.session.userLogged.user_id);
    const openMintedRequests = await Minting_Request.findByEnterprise(req.session.userLogged.user_id);
    const userCategory = req.session.userLogged.user_category_id

    return res.render('enterprise/enterpriseDashboard', { enterpriseLogged, submitedDetails, openMintedRequests, userCategory});
  },
  details: async(req, res) => {
    const submitedDetails = await Users.getDetails(req.session.userLogged.id);
    return res.render('enterprise/details', { submitedDetails });
  },
  submitDetails: async(req, res) => {
    await Users.submitDetails(req.body, req.session.userLogged.id);
    return res.redirect('/enterprise/home');
  },
  mintingRequest: async(req, res) => {
    const plasticItem = await Minting_Request.listPlasticItems();
    const alternativePlasticItem = await Minting_Request.listAlternativePlasticItems();
    const productMeasurementUnit = await Minting_Request.listProductMeasurementUnit();
    const impactApproach = await Minting_Request.listimpactApproach();
    return res.render('enterprise/mintingRequest', { plasticItem, productMeasurementUnit, alternativePlasticItem, impactApproach });
  },
  processMintingRequest: async(req, res) => {
    await Minting_Request.submit(req)
    return res.redirect('/')
  },
  request: async(req,res) => {
    res.render('enterprise/request')
  }
};
module.exports = controller;
