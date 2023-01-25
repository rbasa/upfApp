module.exports = (sequelize, dataTypes) => {
  
  const Alternative_plastic_item = sequelize.define('alternative_plastic_item', {
    id_alternative_plastic_item: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    alternative_plastic_item:{
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
    tableName: 'alternative_plastic_item',
    timestamps: true
  });
  Alternative_plastic_item.associate = function(models){
    Alternative_plastic_item.hasMany(models.unplastified_item, {
      as: 'unplastified_item',
      foreignKey: 'id_alternative_plastic_item'
    })
  };
  
  return Alternative_plastic_item;
}
