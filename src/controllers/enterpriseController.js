const path = require('path');
const Users = require('../models/Users');
const bcryptjs = require('bcryptjs')


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
    return res.render('enterprise/mintingRequest');
  }
};
module.exports = controller;
