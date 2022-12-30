module.exports = (sequelize, dataTypes) => {
  const Treace_type = sequelize.define('treace_type', {
    id_treace_type: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    treace_type:{
      type: dataTypes.TEXT
    }
  },
  {
    tableName: 'treace_type',
    timestamps: false
  });
  // Treace_type.associate = function(modelName){
  //   Treace_type.hasMany(modelName.Minting_request, {
  //     as: 'minting_request',
  //     foreignKey: 'id_treace_type'
  //   })
  // }
  return Treace_type;
}
