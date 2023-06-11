const express = require('express');
const router = express.Router();
const path = require('path');
const checkPermissions = require('../middlewares/privateFiles');

router.use('/:api?', checkPermissions, express.static(path.join(__dirname, '../private')));


module.exports = router;
