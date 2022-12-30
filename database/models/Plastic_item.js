module.exports = (sequelize, dataTypes) => {
  const Plastic_item = sequelize.define('plastic_item', {
    id_plastic_item: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    plastic_item:{
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
    tableName: 'plastic_item',
    timestamps: true
  });
  Plastic_item.associate = function(modelName){
    Plastic_item.hasMany(modelName.Minting_request, {
      as: 'minting_request_before',
      foreignKey: 'id_plastic_item_before'
    })
  }
  return Plastic_item;
}
