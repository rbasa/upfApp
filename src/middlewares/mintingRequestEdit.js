const Unplastified_item = require('../models/Unplastified_item');
const Minting_request = require('../models/Minting_Request');

async function editPermision(req, res, next){
  const { minting_request_id: idMintingRequest } = await Unplastified_item.findMintingRequest(req.params.idUnplastifiedItem);
  const statusNotAllowed = await Minting_request.getStatus('Submited');
  const mintingRequestStatus = await Minting_request.findMintingRequestStatus(idMintingRequest);
  // return res.json(idMintingRequest)
  if(statusNotAllowed == mintingRequestStatus){
    return res.redirect('/enterprise/');
  }
  next();
};

module.exports = editPermision
