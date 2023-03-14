const db = require("../../database/models");

const Chat = {
  createNewMsg: async function(req) {
    const newMintingRequest = await db.ChatRoom.create({
      minting_request_id: req.session.minting_request_id,
      user_category_id: req.session.userLogged.user_category_id,
      msg: req.body.newMsg
    });
    return newMintingRequest.minting_request_id;
  },
  findByMintingRequest: async (user_id) => {
    return await db.ChatRoom.findAll({
    where: { user_id: user_id },
    include: [{all: true}]
  })}
};

module.exports = Chat;
