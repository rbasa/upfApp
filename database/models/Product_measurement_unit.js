module.exports = (sequelize, dataTypes) => {
  const Product_measurement_unit = sequelize.define('product_measurement_unit', {
    id_product_measurement_unit: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    measurement_unit:{
      type: dataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'product_measurement_unit',
    timestamps: false
  });
  Product_measurement_unit.associate = function(modelName){
    Product_measurement_unit.hasMany(modelName.unplastified_item, {
      as: 'minting_request',
      foreignKey: 'id_product_measurement_unit'
    })
  }
  return Product_measurement_unit;
}
