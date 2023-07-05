const db = require("../../database/models");

const Chat = {
  createNewMsg: async function (req, decodedToken) {
    return await db.sequelize.query(
      `
      INSERT INTO
        chat_room (minting_request_id, user_category_id, msg)
        SELECT 
          :mintingRequestId,
          (
            SELECT
              id
            FROM
              user_category
            WHERE
              user_category = :userCategory
          ),
          :newMsg;
      `,
      {
        replacements: {
          mintingRequestId: parseInt(req.session.minting_request_id),
          userCategory: decodedToken.userCategory,
          newMsg: req.body.newMsg
        },
        type: db.Sequelize.QueryTypes.INSERT
      }
    );
  },
  findByMintingRequest: async (user_id) => {
    return await db.ChatRoom.findAll({
      where: { user_id: user_id },
      include: [{ all: true }]
    })
  }
};

module.exports = Chat;
