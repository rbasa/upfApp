let db = require("../../database/models");

const Unplastify = {
  list: async() => {
    return await db.Minting_request.findAll();
  }  
}

module.exports = Unplastify;
