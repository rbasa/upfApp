const Users = require('../models/Users');
const Unplastified_item = require('../models/Unplastified_item');
const Minting_request = require('../models/Minting_Request');

const controller = {
  dashboard: async (req, res) => {
    const users = await Users.unregisteredList();
    const openMintedRequests = await Minting_request.listAllWithFk();
    const userCategory = req.session.userLogged.user_category_id;
    return res.json([users, openMintedRequests, userCategory]);
  },
  pendingRegistrations: async (req, res) => {
    const user = await Users.getUserAndCategory(req.params.id);
    switch (user.category.user_category) {
      case 'enterprise':
        const enterprise = await Users.getFullEnterpriseDetails(user.user_id)
        return res.json([user, enterprise]);
      case 'validator':
        return res.json(user);
        case 'unplastify':
        return res.json(user);
      default:
        return res.send('user.category.id');
    }
  },
  aproveUser: async (req,res)=>{
    await Users.approveUser(req.params.id);
    return res.redirect('/api/unplastify/home');
  },
  selectRandomValidators: async (count)=>{
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
    return selectedValidators;
  },
  assignMintingRequestToValidator: async (req,res)=>{
    const { id_status } =  await Minting_request.getStatus('Assign To Validator');
    await Minting_request.updateMintingRequestStatus(req.params.minting_request_id, id_status);
    // randomly assign validator
    console.log(allValidators)
    return res.send(allValidators);
    return res.redirect(`/enterprise/mintingRequest/${req.params.minting_request_id}`);
  },
  processMintingRequestStatusChange: async (req,res)=>{ // should change minting status, not unplastified item
    const status = await Unplastified_item.getStatus(req.params.status);
    if (status) {
      await Unplastified_item.updateMintingRequestStatus(req.params.id, status.id_status);
      return res.redirect('/api/unplastify/home');
    }
    return res.send(status);
  },
  setMintRequestInStandBy: async (req,res)=>{
    res.send('SB'+req.params.id);
  },
  setMintRequestInDeclined: async (req,res)=>{
    res.send('Declined'+req.params.id);
  }
};
module.exports = controller;
