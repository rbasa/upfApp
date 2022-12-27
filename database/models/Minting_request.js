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
    sku:{
      type: dataTypes.TEXT,
    },
    plastic_item:{
      type: dataTypes.TEXT,
    },
    implemented_change:{
      type: dataTypes.TEXT,
    },
    implementation_date:{
      type: dataTypes.DATE,
      allowNull: true
    },
    id_plastic_item_before:{
      type: dataTypes.INTEGER,
    },
    id_alternative_plastic_item:{
      type: dataTypes.INTEGER,
    },
    id_impact_approach:{
      type: dataTypes.INTEGER,
    },
    id_product_measurement_unit:{
      type: dataTypes.INTEGER,
    },
    impact_approach_quantity:{
      type: dataTypes.DECIMAL(30,18),
    },
    minting_reques_status:{
      type: dataTypes.INTEGER,
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
