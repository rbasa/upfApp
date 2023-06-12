const Unplastified_item = require('../models/Unplastified_item');
const Minting_request = require('../models/Minting_Request');
const jwt = require('jsonwebtoken');

async function editPermision(req, res, next){
  const token = req.cookies && req.cookies.token;
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
  // Unplastify can allways edit Minting Request
  if(decodedToken.userCategory=='unplastify'){
    return next();
  }
  // Enterprise users cannot edit when minting request its submited
  let minting_request_id;
  req.params.minting_request_id ? minting_request_id = req.params.minting_request_id : { minting_request_id } = await Unplastified_item.findMintingRequest(req.params.idUnplastifiedItem);
  const statusResult = await Minting_request.findMintingRequestStatus(minting_request_id);
  const status = statusResult[0].status;
  const statusNotAllowed = ['Submited', 'In Review', 'Approved', 'Rejected', 'Stand-by'];
  if(statusNotAllowed.includes(status)){
    return res.redirect('/enterprise/');
  }
  return next();
};

module.exports = editPermision
