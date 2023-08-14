const jwt = require('jsonwebtoken');
const guestMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', ''); // Extract the token from the cookies
  // Check if the token exists
  if (token) {
    try {
      // Verify and decode the token
      jwt.verify(token, process.env.SECRET_KEY_JWT);
      // If the token is valid, redirect the user
      return res.redirect('/users/redirectUser');
    } catch (error) {
      // If there's an error with the token a malicius attack might be occurring
      return res.status(403).send('Forbidden');
    }
  }
  // If there's no token, continue to the next middleware
  next();
};

module.exports = guestMiddleware;
