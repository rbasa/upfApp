const Users = require('../models/Users');
const Unplastified_item = require('../models/Unplastified_item');
const Minting_request = require('../models/Minting_Request');

const controller = {
  home: async (req, res) => {
    const asignedMintingRequests = await Minting_request.findByStatusQuery('Assign To Validator')
    return res.send(asignedMintingRequests);
    return res.render('validator/validatorDashboard');
  }
};
module.exports = controller;
