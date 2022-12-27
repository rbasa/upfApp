const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/enterpriseDocumentation/:filename', (req, res) => {
  // Check if the user is authenticated and authorized to access the file
  if (!req.session.userLogged) {
    // if(!req.session.userLogged||req.session.userLogged.user_category_id!==3){
    // hay que checkiar que el usuario este autenticado
    // hay que chekiar que si es una empresa el asset le perteneca
    return res.status(401).send('Unauthorized');
  }

  const filepath = path.join(__dirname, 'private/enterpriseDocumentation', req.params.filename);
  res.sendFile(filepath);
});

module.exports = router
