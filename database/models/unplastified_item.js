module.exports = (sequelize, dataTypes) => {
  const Unplastified_item = sequelize.define('unplastified_item', {
    unplastified_item_id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    minting_request_id: {
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
    additional_documents:{
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
    dir_name:{
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
    tableName: 'unplastified_item',
    timestamps: true
  });
  Unplastified_item.associate = function(models){
    Unplastified_item.belongsTo(models.product_measurement_unit, {
      as: 'product_measurement_unit',
      foreignKey: 'id_product_measurement_unit'
    })
  };
  Unplastified_item.associate = function(models){
    Unplastified_item.belongsTo(models.plastic_item, {
      as: 'plastic_item_before',
      foreignKey: 'id_plastic_item'
    })
  };
  Unplastified_item.associate = function(models){
    Unplastified_item.belongsTo(models.plastic_item, {
      as: 'plastic_item_after',
      foreignKey: 'id_plastic_item'
    })
  };
  Unplastified_item.associate = function(models){
    Unplastified_item.belongsTo(models.alternative_plastic_item, {
      as: 'alternative_plastic_item',
      foreignKey: 'id_alternative_plastic_item'
    })
  };
  Unplastified_item.associate = function(models){
    Unplastified_item.belongsTo(models.impact_approach, {
      as: 'impact_approach',
      foreignKey: 'id_impact_approach'
    })
  };
  return Unplastified_item;
}
