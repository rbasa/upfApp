let db = require("../../database/models");

const Minting_request = {
  getFileArray: (fieldname, req) => {
    return req.files.some(file => file.fieldname === fieldname)
      ? JSON.stringify(
          req.files
            .filter(file => file.fieldname === fieldname)
            .map(file => file.path)
        )
      : JSON.stringify([]);
  },
  submit: async function(req) {
    await db.Minting_request.create({
      user_id: req.session.userLogged.user_id,
      before_pic: this.getFileArray('before_pic', req),
      after_pic: this.getFileArray('after_pic', req),
      video: this.getFileArray('video', req),
      technical_file: this.getFileArray('technical_file', req),
      additional_pics: this.getFileArray('additional_pics', req),
      sku: req.body.sku,
      plastic_item: req.body.plastic_item,
      implemented_change: req.body.implemented_change,
      implementation_date: req.body.implementation_date ? req.body.implementation_date : null,
      id_plastic_item_before: req.body.id_plastic_item_before,
      id_alternative_plastic_item: req.body.id_plastic_item_after,
      id_impact_approach: req.body.impact_approach,
      id_product_measurement_unit: req.body.id_product_measurement_unit,
      impact_approach_quantity: req.body.impact_approach_quantity ? req.body.impact_approach_quantity : null,
      dir_name: req.dirName,
      id_minting_request_status: 1
    });
  },
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
  listPlasticItems: async()=>{
    return await db.plastic_item.findAll();
  },
  listTraceType: async()=>{
    return await db.treace_type.findAll();
  },
  listProductCategory: async()=>{
    return await db.product_category.findAll();
  },
  listDesplastifiedActivity: async()=>{
    return await db.desplastified_activity.findAll();
  },
  listProductMeasurementUnit: async()=>{
    return await db.product_measurement_unit.findAll();
  },
  listAlternativePlasticItems: async()=>{
    return await db.alternative_plastic_item.findAll();
  },
  listSourceChange: async()=>{
    return await db.source_change.findAll();
  },
  listimpactApproach: async()=>{
    return await db.impact_approach.findAll();
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

module.exports = Minting_request;
