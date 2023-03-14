module.exports = (sequelize, dataTypes) => {
  const Minting_request = sequelize.define('minting_request', {
    minting_request_id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id:{
      type: dataTypes.INTEGER,
      allowNull: false
    },
    name:{
      type: dataTypes.TEXT,
      allowNull: false
    },
    status_id:{
      type: dataTypes.INTEGER,
      allowNull: false
    },
    createdAt:{
      type: dataTypes.DATE
    },
    updatedAt:{
      type: dataTypes.DATE
    }
  },
  {
    tableName: 'minting_request',
    timestamps: true
  });
  Minting_request.associate = function(models){
    Minting_request.belongsTo(models.User, {
      as: 'user_request',
      foreignKey: 'user_id'
    }),
    Minting_request.belongsTo(models.minting_request_status, {
      as: 'minting_status',
      foreignKey: 'status_id'
    }),
    Minting_request.hasMany(models.ChatRoom, {
      as: 'chatRooms',
      foreignKey: 'minting_request_id'
    })
  };
  return Minting_request;
}
