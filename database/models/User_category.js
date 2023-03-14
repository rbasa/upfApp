module.exports = (sequelize, dataTypes) => {
  const User_category = sequelize.define('user_category', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_category:{
      type: dataTypes.STRING(50),
      allowNull: false
    },
  },
  {
    tableName: 'user_category',
    timestamps: false
  });
  User_category.associate = function(modelName){
    User_category.hasMany(modelName.User, {
      as: 'users',
      foreignKey: 'user_category_id'
    }),
    User_category.hasMany(modelName.ChatRoom, {
      as: 'chat_rooms',
      foreignKey: 'user_category_id'
    })
  };
  return User_category
}