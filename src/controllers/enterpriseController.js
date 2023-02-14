const Users = require('../models/Users');
const Unplastified_item = require('../models/Unplastified_item');
const Minting_request = require('../models/Minting_Request');
const { validationResult } = require('express-validator');

const controller = {
  dashboard: async (req, res) => {
    // const errorMessages = req.session.errors || [];
    const errorMessages = req.flash('error');
    const enterpriseLogged = req.session.userLogged;
    const submitedDetails = await Users.hasSubmitedDetails(req.session.userLogged.user_id);
    const userCategory = req.session.userLogged.user_category_id
    const openMintedRequests = await Minting_request.findByEnterprise(req.session.userLogged.user_id);
    req.session.minting_request_id = null
    return res.render('enterprise/enterpriseDashboard', { enterpriseLogged, submitedDetails, openMintedRequests, userCategory, errorMessages});
  },
  details: async (req, res) => {
    const user = req.session.userLogged.user_id
    const submitedDetails = await Users.getDetails(user);
    return res.render('enterprise/details', { user, submitedDetails });
  },
  processEnterpriseDetails: async (req, res) => {
    await Users.submitDetails(req.params.id, req.body);
    return res.redirect('/enterprise/home');
  },
  newMintingRequest: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // const errorMessages = Object.values(errors.mapped()).map(error => error.msg);
      // req.flash('error', errorMessages);
      // return res.redirect('/enterprise/home');
      req.flash('error', errors.mapped());
      return res.redirect('/enterprise/home');
    }
    const minting_request_id = await Minting_request.create(req);
    return res.redirect(`/enterprise/mintingRequest/${minting_request_id}`);
  },
  mintingRequestDetail: async (req,res) => {
    let mintingRequestId
    req.params.idMintingRequest ? mintingRequestId = req.params.idMintingRequest : mintingRequestId = req.session.minting_request_id;
    const unplastifiedItems = await Unplastified_item.findByMintingRequest(mintingRequestId);
    const mintingRequest = await Minting_request.findByPk(mintingRequestId);
    req.session.minting_request_id = mintingRequestId;
    const userCategory = req.session.userLogged.user_category_id;
    const plasticItem = await Unplastified_item.listPlasticItems();
    const alternativePlasticItem = await Unplastified_item.listAlternativePlasticItems();
    const productMeasurementUnit = await Unplastified_item.listProductMeasurementUnit();
    const impactApproach = await Unplastified_item.listImpactApproach();
    res.render('enterprise/mintingRequestDetail',
    {
      unplastifiedItems,
      mintingRequest,
      userCategory,
      plasticItem,
      alternativePlasticItem,
      productMeasurementUnit,
      impactApproach
    });
  },
  uploadUnplastifiedItem: async (req, res) => {
    await Unplastified_item.submit(req);
    return res.redirect(`/enterprise/mintingRequest/${req.session.minting_request_id}`);
  },
  addNewUnplastifiedItem: async (req, res) => {
    const plasticItem = await Unplastified_item.listPlasticItems();
    const alternativePlasticItem = await Unplastified_item.listAlternativePlasticItems();
    const productMeasurementUnit = await Unplastified_item.listProductMeasurementUnit();
    const impactApproach = await Unplastified_item.listImpactApproach();
    return res.render('enterprise/unplastifiedItem', { plasticItem, productMeasurementUnit, alternativePlasticItem, impactApproach });
  },
  editUnplastifiedItem: async (req, res) => {
    return res.redirect(`/enterprise/mintingRequest/${(await Unplastified_item.edit(req)).minting_request_id}`)
  },
  changeMintingRequestName: async (req,res)=>{
    await Minting_request.changeMintingRequestName(req);
    return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}`);
  },
  submitMintingRequest: async (req,res)=>{
    // change status to submited
    const { id_status } =  await Minting_request.getStatus('submited');
    await Minting_request.updateMintingRequestStatus(req.params.minting_request_id, id_status);
    return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}`);
  }
};
module.exports = controller;
