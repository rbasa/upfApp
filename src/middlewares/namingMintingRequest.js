const { check } = require('express-validator');

const namingMintingRequest = [
  check('name')
    .notEmpty().withMessage('Please complete the Minting Request name, you would be able to change this name later'),
];

module.exports = namingMintingRequest;
