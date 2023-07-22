const Minting_request = require('../models/Minting_Request');

function userMiddleware(mintingNotInStatus) {
  return async function (req, res, next) {
    actualState = await Minting_request.findMintingRequestStatus(req.params.minting_request_id);
    if (mintingNotInStatus == actualState[0].status) {
      return res.redirect('users/redirect');
    } else {
      return next()
    }
  }
}

module.exports = userMiddleware;
