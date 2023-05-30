const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainControllerApi');

router.get('/api/', controller.index);

module.exports = router;
