const path = require('path');
const Users = require('../models/Users');
const Minting_Request = require('../models/Minting_Request');
// const Minting_request = require('../models/Minting_Request');
const bcryptjs = require('bcryptjs');
const Plastic_item = require('../../database/models/Plastic_item');


const controller = {
  dashboard: async (req, res) => {
    const enterpriseLogged = req.session.userLogged;
    const submitedDetails = await Users.hasSubmitedDetails(req.session.userLogged.id);
    return res.render('enterprise/enterpriseDashboard', { enterpriseLogged, submitedDetails });
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
    const treaceType = await Minting_Request.listTraceType();
    const productCategory = await Minting_Request.listProductCategory();
    const desplastifiedActivity = await Minting_Request.listDesplastifiedActivity();
    const productMeasurementUnit = await Minting_Request.listProductMeasurementUnit();
    const alternativePlasticItem = await Minting_Request.listAlternativePlasticItems();
    const sourceChange = await Minting_Request.listSourceChange();
    const impactApproach = await Minting_Request.listimpactApproach();

    return res.render('enterprise/mintingRequest', { plasticItem, treaceType, productCategory, desplastifiedActivity, productMeasurementUnit, alternativePlasticItem, sourceChange, impactApproach });
  },
  processMintingRequest: async(req, res) => {
    if(req.file){
      const filex = req.file.path;
      const fileNamex = req.file.filename;
    }
    a=req.session.userLogged.user_id
    return res.send(req.file)
    await Minting_Request.submit(req.session.userLogged, req.body, req.file)
    return res.send(req.file);
  }
};
module.exports = controller;
