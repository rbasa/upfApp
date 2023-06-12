let db = require("../../database/models");

const Validator = {
  selectValidators: async function(candidates, q) {
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
          `,{ replacements: [q], type: db.Sequelize.QueryTypes.SELECT }
        );
        return result;
    }
  }  
};

module.exports = Validator;
