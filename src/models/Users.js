let db = require("../../database/models");

const User = {
  list: async () => {
    return await db.User.findAll();
  },
  unregisteredList: async () => {
    return await db.User.findAll({
      where: { registered: 0 },
      include: [{ association: 'category' }],
      attributes: ['user_id', 'name', 'email', 'address', 'createdAt']
    });
  },
  listUserByCategory: async function (userCategory) {
    return await db.sequelize.query(
      `select
        a.*
      from
        user a
      where
        user_category_id = (
          select
            id
          from
            user_category
          where
          user_category = ?
        )
      and
        registered = 1;`,
      { replacements: [userCategory], type: db.Sequelize.QueryTypes.SELECT });
  },
  listCategory: async () => {
    return await db.user_category.findAll();
  },
  findByPk: async (id) => {
    return await db.User.findByPk(id);
  },
  findByEmail: async (email) => {
    return await db.User.findOne({
      where: { email: email }
    });
  },
  createLoginToken: async (email) => {
    return await db.sequelize.query(
      `
      SELECT
        a.user_id,
        a.name,
        a.password,
        a.email,
        a.address,
        b.user_category,
        a.registered,
        c.user_id submitedDetails
      from
        user a
      left join
        user_category b
      on
        a.user_category_id = b.id
      left join
        enterprise_details c
      on
        a.user_id = c.user_id
      where
        a.email = ?
      LIMIT 1
      `, { replacements: [email], type: db.Sequelize.QueryTypes.SELECT }
    );
  },
  getUserCategory: async (id) => {
    return await db.sequelize.query(
      `
      SELECT
        a.user_id,
        a.name,
        a.address,
        a.email,
        a.createdAt,
        b.user_category
      FROM
        user a
      INNER JOIN
        user_category b
      ON
        a.user_category_id = b.id
      where
        a.user_id = ?
      `, { replacements: [id], type: db.Sequelize.QueryTypes.SELECT }
    );
  },
  getDetails: async (id) => {
    return await db.enterprise_detail.findByPk(id)
  },
  getFullEnterpriseDetails: async (id) => {
    return await db.User.findByPk(id, {
      where: { user_category_id: 2 },
      include: [{ association: 'enterprise_detail' }]
    });
  },
  approveUser: async (id) => {
    await db.User.update({
      registered: 1,
    },
      {
        where: { user_id: id },
      });
  },
  userLogged: async (email) => {
    return await db.User.findOne({
      where: { email: email },
      attributes: ['user_id', 'name', 'email', 'address', 'user_category_id', 'registered']
    });
  },
  create: async function (userData) {
    await db.User.create({
      name: userData.name,
      email: userData.email,
      address: userData.address,
      password: userData.password,
      user_category_id: userData.category
    });
  },
  submitDetails: async function (id, userData) {
    await db.enterprise_detail.create({
      user_id: id,
      cuit: userData.cuit,
      country: userData.country,
      city: userData.city,
      employees: userData.employees,
      invoicing: userData.invoicing,
      mipyme: userData.mipyme
    });
  },
  hasSubmitedDetails: async function (id) {
    return await db.enterprise_detail.findByPk(id);
  }
};

module.exports = User;
