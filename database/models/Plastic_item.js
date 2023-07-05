module.exports = (sequelize, dataTypes) => {
  const Plastic_item = sequelize.define('plastic_item', {
    id_plastic_item: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    plastic_item: {
      type: dataTypes.TEXT,
      allowNull: false
    }
  },
    {
      tableName: 'plastic_item',
      timestamps: false
    });
  Plastic_item.associate = function (modelName) {
    Plastic_item.hasMany(modelName.unplastified_item, {
      as: 'minting_request_before',
      foreignKey: 'id_plastic_item_before'
    })
  }
  return Plastic_item;
}
