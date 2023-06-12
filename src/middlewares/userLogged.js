const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const userLoggedMiddleware = async (req, res, next) => {
  res.locals.isLogged = false;

  // Check if the token exists in cookies
  const token = req.cookies && req.cookies.token;

  try {
    if (token) {
      // Verify and decode the token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);

      // Find the user based on the decoded token information
      const user = await User.findByPk(decodedToken.userId);

      if (user) {
        // Set the user as logged in
        req.session.userLogged = {
          user_id: user.user_id,
          email: user.email,
          address: user.address,
          user_category: user.user_category
        };

        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
      }
    }

    next();
  } catch (error) {
    // If there's an error with the token or user not found, clear the session
    req.session.userLogged = null;
    return res.status(403).send('Forbidden');
  }
};

module.exports = userLoggedMiddleware;
