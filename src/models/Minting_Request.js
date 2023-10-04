const db = require("../../database/models");

const Minting_request = {
  create: async function (req) {
    const newMintingRequestStatus = await db.minting_request_status.findOne({
      where: { status: 'created' }
    });
    const newMintingRequest = await db.minting_request.create({
      user_id: req.session.userLogged.user_id,
      name: req.body.name || 'no name',
      status_id: newMintingRequestStatus.id_status
    });
    return newMintingRequest.minting_request_id;
  },
  findByEnterprise: async (user_id) => {
    return await db.sequelize.query(
      `
      select
        *
      from
        minting_request a
      inner join
        minting_request_status b
      on
        a.status_id = b.id_status
      where
        a.user_id = ?
      ;`,
      { replacements: [user_id], type: db.Sequelize.QueryTypes.SELECT });
  },
  findByEnterpriseWithDetails: async (user_id) => {
    return await db.sequelize.query(
      `
      select
        *
      from
        minting_request a
      inner join
        minting_request_status b
      on
        a.status_id = b.id_status
      inner join
        unplastified_item c
      on
        c.minting_request_id = a.minting_request_id
      where
        a.user_id = ?
      ;`,
      { replacements: [user_id], type: db.Sequelize.QueryTypes.SELECT });
  },
  findAllMintingRequest: async (user_id) => {
    return await db.sequelize.query(
      `
      select
        a.*,
        c.name enterpriseName
      from
        minting_request a
      inner join
        minting_request_status b
      on
        a.status_id = b.id_status
      inner join
        user c
      on
        a.user_id = c.user_id
      ;`,
      { replacements: [user_id], type: db.Sequelize.QueryTypes.SELECT });
  },
  findAllWithDetails: async (user_id) => {
    return await db.sequelize.query(
      `
      select
        *
      from
        minting_request a
      inner join
        minting_request_status b
      on
        a.status_id = b.id_status
      inner join
        unplastified_item c
      on
        c.minting_request_id = a.minting_request_id
      ;`,
      { replacements: [user_id], type: db.Sequelize.QueryTypes.SELECT });
  },
  findByValidator: async (validator_id) => {
    return await db.sequelize.query(
      `
      select
        a.*,
        c.name enterpriseName
      from
        minting_request a
      inner join
        minting_request_status b
      on
        a.status_id = b.id_status
      inner join
        user c
      on
        a.user_id = c.user_id
      inner join
        validation_tracking d
      on
        d.minting_request_id = a.minting_request_id
      inner join
        validation_status e
      on
        e.validation_status_id = d.validation_status_id
      where
        d.user_id = ?
      and
        e.status not in ('Canceled', 'Approved') 
      ;`,
      { replacements: [validator_id], type: db.Sequelize.QueryTypes.SELECT });
  },
  listAllWithFk: async () => {
    return await db.sequelize.query(
      `
      select
        a.*,
        b.*,
        c.*,
        d.name
      from
        minting_request a
      inner join
        minting_request_status b
      on
        a.status_id = b.id_status
      inner join 
        unplastified_item c
      on
        c.minting_request_id = a.minting_request_id
      inner join
        user d
      on
        d.user_id = a.user_id
      ;`,
      { type: db.Sequelize.QueryTypes.SELECT });
  },
  list: async () => {
    return await db.minting_request.findAll();
  },
  findByPk: async (minting_request_id) => {
    return await db.minting_request.findByPk(minting_request_id,
      {
        include: [{ all: true }]
      }
    );
  },
  findMintingRequestStatus: async (minting_request_id) => {
    return await db.sequelize.query(
      `
      select
        b.status
      from
        minting_request a
      inner join
        minting_request_status b
      on
        a.status_id = b.id_status
      where
        a.minting_request_id = ?
      ;`,
      { replacements: [minting_request_id], type: db.Sequelize.QueryTypes.SELECT });
  },
  getStatus: async function (e) {
    return await db.minting_request_status.findOne({
      attributes: ['id_status'],
      where: { status: e },
    });
  },
  findByStatusQuery: async function (status) {
    return await db.sequelize.query(
      `select
        *
      from
        minting_request
      where
        status_id = (
          select
            id_status
          from
            minting_request_status
          where
            status = ?
        );`,
      { replacements: [status], type: db.Sequelize.QueryTypes.SELECT });
  },
  findByStatus: async function (status) {
    const { dataValues: { id_status } } = await this.getStatus(status);
    return await db.minting_request.findAll()
  },
  changeMintingRequestName: async (req) => {
    return await db.minting_request.update({
      name: req.body.newName,
    },
      {
        where: { minting_request_id: req.params.minting_request_id },
      });
  },
  updateMintingRequestStatus: async (id, status) => {
    const query = `
      UPDATE
        minting_request
      SET
        status_id = (
          select
            id_status
          from
            minting_request_status
          WHERE
            status = :status
        )
      WHERE
        minting_request_id = :id
    `;
    const replacements = { status, id };
    return await db.sequelize.query(query, { replacements });
  },
  listNegativeVotes: async () => {
    const query = `
      SELECT
        a.name minting_request,
        u.name enterprise,
        rejects.minting_request_id,
        COUNT(rejects.minting_request_id) AS negative_votes,
        COUNT(approves.minting_request_id) AS approved_votes
      FROM
        (
          SELECT
            minting_request_id
          FROM
            validation_tracking
          WHERE
            validation_status_id = (
              SELECT
                validation_status_id
              FROM
                validation_status
              WHERE
                status = 'Rejected'
            )
        ) AS rejects
      LEFT JOIN
        (
          SELECT
            minting_request_id
          FROM
            validation_tracking
          WHERE
            validation_status_id = (
              SELECT
                validation_status_id
              FROM
                validation_status
              WHERE
                status = 'Approved'
            )
        ) AS approves
      ON
        approves.minting_request_id = rejects.minting_request_id
      INNER JOIN
        minting_request a
      ON
        rejects.minting_request_id = a.minting_request_id
      INNER JOIN
        user u
      on
        u.user_id = a.user_id
      GROUP BY
        rejects.minting_request_id;
    `;
    return await db.sequelize.query(query);
  }
};

module.exports = Minting_request;
