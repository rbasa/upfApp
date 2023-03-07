const Unplastified_item = require('../models/Unplastified_item');
const Minting_request = require('../models/Minting_Request');

async function editPermision(req, res, next){
  // Unplastify can allways edit Minting Request
  if(req.session.userLogged.user_category_id==3){
    console.log('sucede esto')
    return next();
  }
  const { id_status: statusNotAllowed } = await Minting_request.getStatus('Submited');
  const { minting_request_id: idMintingRequest } = req.params.minting_request_id || await Unplastified_item.findMintingRequest(req.params.idUnplastifiedItem)
  const { status_id: mintingRequestStatus } = await Minting_request.findMintingRequestStatus(idMintingRequest);
  // Submited MR should not be edited
  if(statusNotAllowed == mintingRequestStatus){
    return res.redirect('/enterprise/');
  }
  return next();
};

module.exports = editPermision
