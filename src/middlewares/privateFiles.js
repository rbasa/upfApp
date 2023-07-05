const path = require('path');
const userLogged = require('./userLogged');
const User = require('../controllers/userController');

function checkPermissions(req, res, next) {
  const decodedToken = User.captureAuth(req);
  if (!decodedToken || !decodedToken.userLogged) {
    return res.status(403).send('Forbidden');
  };
  const userCategoryId = decodedToken.userLogged.user_category_id;
  switch (userCategoryId) {
    case 3:
    case 1:
      if (decodedToken.userLogged.registered === 1) {
        return next();
      };
      break;
    case 2:
      const userId = decodedToken.userLogged.user_id;
      const fileUserId = Number(req.path.split('/')[2]);
      if (userId === fileUserId) {
        return next();
      };
      break;
  }

  res.status(403).send('Forbidden');
};

module.exports = checkPermissions;
