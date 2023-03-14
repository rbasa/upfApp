module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define('ChatRoom', {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    minting_request_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_category_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    msg:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt:{
      type: DataTypes.DATE
    },
    updatedAt:{
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'chat_room'
  });

  ChatRoom.associate = function(models) {
    ChatRoom.belongsTo(sequelize.models.minting_request, {
      as: 'mintingRequest',
      foreignKey: 'minting_request_id'
    }),
    ChatRoom.belongsTo(sequelize.models.user_category, {
      as: 'id',
      foreignKey: 'user_category_id'
    })
  }

  return ChatRoom;
};
