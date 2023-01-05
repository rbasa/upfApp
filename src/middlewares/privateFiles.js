const path = require('path');
const userLogged = require('./userLogged')
// des hardcodear el true del middleware para que solo se renderice si es upf, validador, o la misma empresa

function checkPermissions(req, res, next) {
  if (!req.session || !req.session.userLogged) {
    return res.status(403).send('Forbidden');
  }

  const userCategoryId = req.session.userLogged.user_category_id;
  if (userCategoryId === 3 || userCategoryId === 1) {
    if (req.session.userLogged.registered === 1) {
      // Unplastify and validators always have permission
      return next();
    }
  } else if (userCategoryId === 2) {
    // Enterprise can only acces their own documents
    const userId = req.session.userLogged.user_id;
    const fileUserId = Number(req.path.split('/')[2]);
    if (userId === fileUserId) {
      return next();
    }
  }

  res.status(403).send('Forbidden');
}
module.exports = checkPermissions
