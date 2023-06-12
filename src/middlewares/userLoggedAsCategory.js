const jwt = require('jsonwebtoken');

function userMiddleware(requiredUserCategory) {
  return function (req, res, next) {
    const token = req.cookies && req.cookies.token;

    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
        
        if (decodedToken.userCategory === requiredUserCategory) {
          req.session.userLogged = {
            user_id: decodedToken.userId,
            email: decodedToken.email,
            address: decodedToken.address,
            user_category: decodedToken.user_category
          };

          return next();
        } else {
          // Redirect user since the required user_category doesn't match
          return res.redirect('/users/login');
        }
      } catch (error) {
        // If there's an error with the token, clear the session
        req.session.userLogged = null;
        return res.status(403).send('Forbidden');
      }
    } else {
      // Redirect user since there's no token
      return res.redirect('/users/login');
    }
  };
}

module.exports = userMiddleware;
