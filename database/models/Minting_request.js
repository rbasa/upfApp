module.exports = (sequelize, dataTypes) => {
  const Minting_request = sequelize.define('Minting_request', {
    minting_request_id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id:{
      type: dataTypes.INTEGER,
      allowNull: false
    },
    before_pic:{
      type: dataTypes.TEXT,
    },
    after_pic:{
      type: dataTypes.TEXT,
    },
    video:{
      type: dataTypes.TEXT,
    },
    technical_file:{
      type: dataTypes.TEXT,
    },
    additional_pics:{
      type: dataTypes.TEXT,
    },
    proof_of_purchase:{
      type: dataTypes.TEXT,
    },
    dispatch_note:{
      type: dataTypes.TEXT,
    },
    sku:{
      type: dataTypes.TEXT,
    },
    id_treace_type:{
      type: dataTypes.INTEGER,
    },
    plastic_item:{
      type: dataTypes.TEXT,
    },
    graduality_category:{
      type: dataTypes.TEXT,
    },
    id_product_category:{
      type: dataTypes.INTEGER,
    },
    id_desplastified_activity:{
      type: dataTypes.INTEGER,
    },
    id_product_measurement_unit:{
      type: dataTypes.INTEGER,
    },
    id_plastic_item_before:{
      type: dataTypes.INTEGER,
    },
    previous_plastic_weight:{
      type: dataTypes.DECIMAL(30,18),
    },
    previous_cuantity:{
      type: dataTypes.DECIMAL(30,18),
    },
    id_source_change:{
      type: dataTypes.INTEGER,
    },
    id_source_change:{
      type: dataTypes.DATE,
    },
    id_alternative_plastic_item:{
      type: dataTypes.INTEGER,
    },
    actual_plastic_weight:{
      type: dataTypes.DECIMAL(30,18),
    },
    actual_cuantity:{
      type: dataTypes.DECIMAL(30,18),
    },
    plastic_ratio:{
      type: dataTypes.DECIMAL(30,18),
    },
    id_impact_approach:{
      type: dataTypes.INTEGER,
    },
    impact_approach_quantity:{
      type: dataTypes.DECIMAL(30,18),
    },
    id_impact_approach:{
      type: dataTypes.INTEGER,
    },
    impact_approach_files:{
      type: dataTypes.TEXT,
    },
    createdAt:{
      type: dataTypes.DATE
    },
    updatedAt:{
      type: dataTypes.DATE
    }
  },
  {
    tableName: 'minting_request',
    timestamps: true
  });
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.treace_type, {
      as: 'treace_type',
      foreignKey: 'id_treace_type'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.product_category, {
      as: 'product_category',
      foreignKey: 'id_product_category'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.desplastified_activity, {
      as: 'desplastified_activity',
      foreignKey: 'id_desplastified_activity'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.desplastified_activity, {
      as: 'desplastified_activity',
      foreignKey: 'id_desplastified_activity'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.product_measurement_unit, {
      as: 'product_measurement_unit',
      foreignKey: 'id_product_measurement_unit'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.plastic_item, {
      as: 'plastic_item_before',
      foreignKey: 'id_plastic_item'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.plastic_item, {
      as: 'plastic_item_after',
      foreignKey: 'id_plastic_item'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.source_change, {
      as: 'source_change',
      foreignKey: 'id_source_change'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.alternative_plastic_item, {
      as: 'alternative_plastic_item',
      foreignKey: 'id_alternative_plastic_item'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.impact_approach, {
      as: 'impact_approach',
      foreignKey: 'id_impact_approach'
    })
  };
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.minting_request_status, {
      as: 'minting_request_status',
      foreignKey: 'id_minting_request_status'
    })
  };
  return Minting_request;
}
