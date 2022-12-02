const path = require('path');
const Users = require('../models/Users');
const bcryptjs = require('bcryptjs')


const controller = {
  dashboard: async (req, res) => {
    const users = await Users.unregisteredList()
    return res.render('unplastify/upfDashboard', { users });
  },
  pendingRegistrations: async (req, res) => {
    const user = await Users.getCategory(req.params.id)
    switch (user.category.user_category) {
      case 'enterprise':
        const enterprise = await Users.getFullEnterpriseDetails(user.user_id)
        return res.render('unplastify/upfEnterprisePendingRegistrations', { enterprise });
      case 'validator':
        return res.send('el usuario es validator');
      case 'unplastify':
        return res.send('el usuario es upf');
      default:
        return res.send('user.category.id')
    }
  },
  aproveEnterprise: async (req,res)=>{
    await Users.approveEnterprise(req.params.id)
    return res.redirect('/unplastify/home')
  }
};
module.exports = controller;
