const path = require('path');
const Users = require('../models/Users');
const bcryptjs = require('bcryptjs')
const Minting_Request = require('../models/Minting_Request');

const controller = {
  dashboard: async (req, res) => {
    const users = await Users.unregisteredList()
    const openMintedRequests = await Minting_Request.list();
    const userCategory = req.session.userLogged.user_category_id
    return res.render('unplastify/upfDashboard', { users, openMintedRequests, userCategory});
  },
  pendingRegistrations: async (req, res) => {
    const user = await Users.getUserAndCategory(req.params.id)

    switch (user.category.user_category) {
      case 'enterprise':
        const enterprise = await Users.getFullEnterpriseDetails(user.user_id)
        return res.render('unplastify/upfEnterprisePendingRegistrations', { user, enterprise });
      case 'validator':
        return res.render('unplastify/upfEnterprisePendingRegistrations', { user });
      case 'unplastify':
        return res.render('unplastify/upfEnterprisePendingRegistrations', { user });
      default:
        return res.send('user.category.id')
    }
  },
  aproveUser: async (req,res)=>{
    await Users.approveUser(req.params.id)
    return res.redirect('/unplastify/home')
  },
  setMintRequestInReview: async (req,res)=>{
    res.send('InReview'+req.params.id)
  },
  setMintRequestAsAproved: async (req,res)=>{
    res.send('Aproved'+req.params.id)
  },
  setMintRequestRequestFurtherInfo: async (req,res)=>{
    res.send('furtherinfo'+req.params.id)
  },
  setMintRequestInStandBy: async (req,res)=>{
    res.send('SB'+req.params.id)
  },
  setMintRequestInDeclined: async (req,res)=>{
    res.send('Declined'+req.params.id)
  }
};
module.exports = controller;
