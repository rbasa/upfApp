let db = require("../../database/models");

const Minting_request = {
  list: async() => {
    return await db.Minting_request.findAll();
  },
  findByPk: async (id) => {
    return await db.Minting_request.findByPk(id);
  },
  findByEnterprise: async (user_id) => {
    return await db.Minting_request.findAll({
    where: { user_id: user_id }
  })},
  create: async function(userData){
    // falta establecer campos de cantidad en la tabla
    await db.Minting_request.create({
    user_id: userData.user_id,
    before_pic: userData.before_pic,
    after_pic: userData.after_pic,
    video: userData.video,
    technical_file: userData.technical_file,
    additional_pics: userData.additional_pics,
    proof_of_purchase: userData.proof_of_purchase,
    dispatch_note: userData.dispatch_note,
    id_plastic_item_before: userData.id_plastic_item_before,
    id_treace_type: userData.id_treace_type,
    id_product_category: userData.id_product_category,
    id_desplastified_activity: userData.id_desplastified_activity,
    id_product_measurement_unit: userData.id_product_measurement_unit,
    id_plastic_item_after: userData.id_plastic_item_after,
    id_alternative_plastic_item: userData.id_alternative_plastic_item,
    id_source_change: userData.id_source_change
    });
  },
  listPlasticItem: async () => {
    return await db.plastic_item.findAll()
  },
  listTreace_type: async () => {
    return await db.treace_type.findAll()
  },
  listProduct_category: async () => {
    return await db.treace_type.findAll()
  },
  
}

module.exports = User;
