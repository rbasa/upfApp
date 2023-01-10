const path = require('path');
const userLogged = require('./userLogged')
function checkPermissions(req, res, next) {
  if (!req.session || !req.session.userLogged) {
    return res.status(403).send('Forbidden');
  }

  const userCategoryId = req.session.userLogged.user_category_id;
  switch (userCategoryId) {
    case 3:
    case 1:
      if (req.session.userLogged.registered === 1) {
        return next();
      }
      break;
    case 2:
      const userId = req.session.userLogged.user_id;
      const fileUserId = Number(req.path.split('/')[2]);
      if (userId === fileUserId) {
        return next();
      }
      break;
  }

  res.status(403).send('Forbidden');
}

module.exports = checkPermissions
