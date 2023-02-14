const { check } = require('express-validator');

const namingMintingRequest = [
  check('name')
  .notEmpty().withMessage('Please complete the Minting Request name'),
];

module.exports = namingMintingRequest;
