module.exports = (sequelize, dataTypes) => {
  
  const Minting_request_status = sequelize.define('minting_request_status', {
    id_status: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    status:{
      type: dataTypes.TEXT
    }
  },
  {
    tableName: 'minting_request_status',
    timestamps: false
  });
  Minting_request_status.associate = function(modelName){
    Minting_request_status.hasMany(modelName.minting_request, {
      as: 'minting_request',
      foreignKey: 'status_id'
    })
  }
  return Minting_request_status;
}
