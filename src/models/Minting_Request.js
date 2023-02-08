const db = require("../../database/models");
const path = require('path')

const Minting_request = {
  create: async function(req) {
    const newMintingRequest = await db.minting_request.create({
      user_id: req.session.userLogged.user_id,
      name: req.body.name || 'no name',
      status_id: 1
    });
    return newMintingRequest.minting_request_id;
  },
  findByEnterprise: async (user_id) => {
    return await db.minting_request.findAll({
    where: { user_id: user_id }
  })},
  findByEnterpriseWithUnplastifiedItems: async (user_id) => {
    return await db.sequelize.query("select a.name, a.minting_request_id, user_id, status, b.* from minting_request a left join unplastified_item b on a.minting_request_id = b.minting_request_id inner join minting_request_status c on a. status_id = c.id_status where a.user_id = ?",
    { replacements: [user_id], type: db.Sequelize.QueryTypes.SELECT })
  },
  list: async() => {
    return await db.minting_request.findAll();
  },
  findByPk: async (minting_request_id) => {
    return await db.minting_request.findByPk(minting_request_id);
  },
  getStatus: async (e) => {
    return await db.minting_request_status.findOne({
      attributes: ['id_status'],
      where: { status: e },
    });
  },
  updateMintingRequestStatus: async (id, status) => {
    return await db.minting_request.update({
      status_id: status,
    },
    {
      where: { minting_request_id: id },
    });
  }
}

module.exports = Minting_request;
