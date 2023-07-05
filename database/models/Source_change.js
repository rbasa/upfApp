module.exports = (sequelize, dataTypes) => {

  const Source_change = sequelize.define('source_change', {
    id_source_change: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    source_change: {
      type: dataTypes.TEXT,
      allowNull: false
    }
  },
    {
      tableName: 'source_change',
      timestamps: false
    });
  // Source_change.associate = function(modelName){
  //   Source_change.hasMany(modelName.Minting_request, {
  //     as: 'minting_request',
  //     foreignKey: 'id_source_change'
  //   })
  // }
  return Source_change;
}
