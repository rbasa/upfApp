let db = require("../../database/models");

const User = {
  list: async() => {
    return await db.User.findAll();
  },
  unregisteredList: async() => {
    return await db.User.findAll({
      where:{registered:0},
      include: [{association:'category'}],
      attributes: ['user_id', 'name', 'email','address', 'createdAt']
    });
  },
  listCategory: async () => {
    return await db.user_category.findAll()
  },
  findByPk: async (id) => {
    return await db.User.findByPk(id);
  },
  findByEmail: async (email) => {
    return await db.User.findOne({
    where: { email: email }
  })},
  getDetails: async (id) => {
    return await db.enterprise_detail.findByPk(id)
  },
  getUserAndCategory: async (id) => {
    return await db.User.findByPk(id,{
      include: [{association:'category'}]
    })
  },
  getFullEnterpriseDetails: async (id) => {
    return await db.User.findByPk(id,{
      where:{user_category_id:2},
      include: [{ association:'enterprise_detail' }]
    })
  },
  approveUser: async (id) => {
    await db.User.update({
      registered: 1,
    },
    {
      where: { user_id: id },
    })
  },
  userLogged: async (email) => {
    return await db.User.findOne({ 
      where: {email: email},
      attributes: ['user_id', 'name', 'email','address', 'user_category_id', 'registered']
  })},
  create: async function(userData){
    await db.User.create({
    name: userData.name,
    email: userData.email,
    address: userData.address,
    password: userData.password,
    user_category_id: userData.category
    });
  },
  submitDetails: async function(id, userData){
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
  hasSubmitedDetails: async function(id){
    return await db.enterprise_detail.findByPk(id);
  }
}

module.exports = User;
