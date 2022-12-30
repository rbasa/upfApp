module.exports = (sequelize, dataTypes) => {
  const Product_category = sequelize.define('product_category', {
    id_product_category: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    category:{
      type: dataTypes.TEXT
    },
    createdAt:{
      type: dataTypes.DATE
    },
    updatedAt:{
      type: dataTypes.DATE
    }
  },
  {
    tableName: 'product_category',
    timestamps: true
  });
  // Product_category.associate = function(modelName){
  //   Product_category.hasMany(modelName.Minting_request, {
  //     as: 'minting_request',
  //     foreignKey: 'id_product_category'
  //   })
  // }
  return Product_category;
}
