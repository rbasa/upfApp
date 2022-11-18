module.exports = (sequelize, dataTypes) => {
  const Desplastified_activity = sequelize.define('desplastified_activity', {
    id_desplastified_activity: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    activity:{
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
    tableName: 'desplastified_activity',
    timestamps: true
  });
  Desplastified_activity.associate = function(modelName){
    Desplastified_activity.hasMany(modelName.Minting_request, {
      as: 'minting_request',
      foreignKey: 'id_desplastified_activity'
    })
  }
  return Desplastified_activity;
}
