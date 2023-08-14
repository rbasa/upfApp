const jwt = require('jsonwebtoken');
function registeredMiddleware(req, res, next) {
  const token = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', ''); // Extract the token from the cookies
  // Verify and decode the token
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
  if (decodedToken.registered !== 1) {
    return res.redirect('/users/login');
  };
  next();
}
module.exports = registeredMiddleware;
