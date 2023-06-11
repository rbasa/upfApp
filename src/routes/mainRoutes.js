const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');

router.get('/:api?', controller.index);

module.exports = router;
