const db = require("../../database/models");
const path = require('path');
const fs = require('fs-extra');

const Unplastified_item = {
  list: async() => {
    return await db.unplastified_item.findAll();
  },
  findByPk: async (id) => {
    return await db.unplastified_item.findByPk(id);
  },
  getFileArray(fieldname, req) {
    const privateDir = path.join(__dirname, '..', 'private');
    return req.files.some((file) => file.fieldname === fieldname)
      ? JSON.stringify(
          req.files
            .filter((file) => file.fieldname === fieldname)
            .map((file) => `../private/${path.relative(privateDir, file.path)}`)
        )
      : JSON.stringify([]);
  },
  submit: async function(req) {
    await db.unplastified_item.create({
      minting_request_id: req.session.minting_request_id,
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
      dir_name: req.dirName
    });
  },
  edit: async function(req) {
    await db.unplastified_item.update({
      sku: req.body.sku,
      plastic_item: req.body.plastic_item,
      implemented_change: req.body.implemented_change,
      implementation_date: req.body.implementation_date ? req.body.implementation_date : null,
      id_plastic_item_before: req.body.id_plastic_item_before,
      id_alternative_plastic_item: req.body.id_plastic_item_after,
      id_impact_approach: req.body.impact_approach,
      id_product_measurement_unit: req.body.id_product_measurement_unit,
      impact_approach_quantity: req.body.impact_approach_quantity ? req.body.impact_approach_quantity : null
    },{
      where: { unplastified_item_id: req.params.idUnplastifiedItem },
    });
    return await this.findByPk(req.params.idUnplastifiedItem)
  },
  delete: async function(req) {
    const { dataValues: { minting_request_id: mintingRequestId, dir_name: dirName } } = await this.findByPk(req.params.idUnplastifiedItem);
    const deleted = await db.unplastified_item.destroy({
      where: { unplastified_item_id: req.params.idUnplastifiedItem },
    });
      // deletes all files contained in the dir_name directory 
    if (deleted) {
      usuario = req.session.userLogged.user_id;
      const dirPath = path.join(__dirname, `../private/enterpriseDocumentation/${usuario}/${dirName}`);
      try {
        await fs.remove(dirPath);
        console.log(`Directory ${dirPath} has been removed`);
      } catch (err) {
        console.error(`Error removing directory ${dirPath}: ${err}`);
      }
    }
    return mintingRequestId;
  },
  findMintingRequest: async (id) => {
    return await db.unplastified_item.findByPk(id,
      {
        attributes: ['minting_request_id']
      });
  },
  findByMintingRequest: async (minting_request_id) => {
    return await db.unplastified_item.findAll({
      where: { minting_request_id: minting_request_id },
      include: [{
        all: true
      }]
    })
  },
  listPlasticItems: async()=>{
    return await db.plastic_item.findAll();
  },
  listImpactApproach: async()=>{
    return await db.impact_approach.findAll();
  },
  listProductMeasurementUnit: async()=>{
    return await db.product_measurement_unit.findAll();
  },
  listAlternativePlasticItems: async()=>{
    return await db.alternative_plastic_item.findAll();
  }
};

module.exports = Unplastified_item;
