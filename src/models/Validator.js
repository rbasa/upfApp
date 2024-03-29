let db = require("../../database/models");
const Users = require('../models/Users');
const { QueryTypes } = require('sequelize');

const Validator = {
  selectValidators: async function (q) {
    const candidates = await Users.listUserByCategory('validator')
    switch (true) {
      case candidates.length - q <= 0:
        return candidates;
      case candidates.length - q > 0:
        const result = await db.sequelize.query(
          `
          SELECT
            a.user_id,
            COALESCE(b.assigned_count, 0) AS assigned_count
          FROM
            user a
          LEFT JOIN
            (
              SELECT
                c.*,
                (
                  SELECT
                    COUNT(*)
                  FROM
                    validation_tracking
                  WHERE
                    user_id = c.user_id
                  AND
                    validation_status_id = (
                      SELECT
                        validation_status_id
                      FROM
                        validation_status
                      WHERE
                        status = 'Assigned'
                    )
                ) AS assigned_count
              FROM
                validation_tracking c
            ) b
          ON b.user_id = a.user_id
          WHERE
            user_category_id = (
              SELECT
                id
              FROM
                user_category
              WHERE
                user_category = 'validator'
            )
            AND registered = 1
          ORDER BY
            assigned_count ASC, RAND()
          LIMIT ?;
          `, { replacements: [q], type: db.Sequelize.QueryTypes.SELECT }
        );
        return result.map(validator => validator.user_id);
    }
  },
  assignValidator: async function (minting_request_id, user) {
    await db.sequelize.query(
      `
      INSERT INTO validation_tracking (minting_request_id, user_id, validation_status_id)
        VALUES (?, ?, (
          SELECT
            validation_status_id
          FROM
            validation_status
          WHERE
            status = 'Assigned'
        ));
      `,
      { replacements: [minting_request_id, user.user_id] }
    );
    console.log('el error paso2')
    console.log('el error paso2')
    console.log('el error paso2')
    console.log('el error paso2')
    console.log('el error paso2')
    console.log('el error paso2')
  },
  changeStatus: async function (minting_request_id, user_id, status) {
    await db.sequelize.query(
      `
      UPDATE
        validation_tracking
      SET
        validation_status_id = (
          select
            validation_status_id
          from
            validation_status
          where
            status = :status
        )
      WHERE
        minting_request_id = :mintingRequestId
      AND
        user_id = :userId;
      `,
      {
        replacements: { status, mintingRequestId: minting_request_id, userId: user_id },
        type: QueryTypes.UPDATE
      }
    );
  },
  replaceValidator: async function (mintingRequestId) {
    console.log(`Replacing Validator minting request ${mintingRequestId} `)
    const result = await db.sequelize.query(
      `
      SELECT
        a.user_id,
        COALESCE(b.assigned_count, 0) AS assigned_count
      FROM
        user a
      INNER JOIN
        (
          SELECT
            c.*,
            (
              SELECT
                COUNT(*)
              FROM
                validation_tracking
              WHERE
                user_id = c.user_id
              AND
                validation_status_id = (
                  SELECT
                    validation_status_id
                  FROM
                    validation_status
                  WHERE
                    status = 'Assigned'
                )
            ) AS assigned_count
            FROM
              validation_tracking c
            WHERE
              user_id not in
                (
                  select
                    user_id
                  from
                    validation_tracking
                  where
                    minting_request_id = :mintingRequestId
                )
        ) b
      ON
        b.user_id = a.user_id
      WHERE
        user_category_id = (
          SELECT
            id
          FROM
            user_category
          WHERE
            user_category = 'validator'
        )
        AND registered = 1
      ORDER BY
        assigned_count ASC, RAND()
      LIMIT 1;
      `, { replacements: { mintingRequestId }, type: db.Sequelize.QueryTypes.SELECT }
    );
    console.log(`Replace complete`)
    const newValidator = result[0] ? result[0].user_id : null;
    console.log('The new Validator its ', newValidator)
    if (newValidator) {
      console.log(`Re asigning validator ${mintingRequestId} newValidator ${newValidator}`)
      await this.assignValidator(mintingRequestId, newValidator, 'Assigned')
    }
    return
  },
  obtainAllStatus: async function (minting_request_id) {
    return await db.sequelize.query(
      `
      SELECT
        b.status
      FROM
        validation_tracking a
      INNER JOIN
        validation_status b
      ON
        b.validation_status_id = a.validation_status_id
      WHERE
        minting_request_id = :mintingRequestId
      AND 
        status NOT IN ('Canceled')
      `,
      {
        replacements: { mintingRequestId: minting_request_id }
      }
    );
  },
  assignValidators: async function (minting_request_id, q) {
    const selectedValidators = await this.selectValidators(q);
    selectedValidators.forEach(async user_id => {
      await this.assignValidator(minting_request_id, user_id);
    });
    return selectedValidators.length;
  }
};

module.exports = Validator;
