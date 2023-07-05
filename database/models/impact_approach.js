module.exports = (sequelize, dataTypes) => {

  const Impact_approach = sequelize.define('impact_approach', {
    id_impact_approach: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    impact_approach: {
      type: dataTypes.TEXT
    }
  },
    {
      tableName: 'impact_approach',
      timestamps: false
    });
  Impact_approach.associate = function (modelName) {
    Impact_approach.hasMany(modelName.unplastified_item, {
      as: 'unplastified_item',
      foreignKey: 'id_impact_approach'
    })
  }
  return Impact_approach;
}
