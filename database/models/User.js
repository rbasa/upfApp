module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: dataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(60),
    },
    address: {
      type: dataTypes.STRING(42),
      allowNull: false
    },
    password: {
      type: dataTypes.TEXT,
      allowNull: false
    },
    user_category_id: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    registered: {
      type: dataTypes.INTEGER
    },
    createdAt: {
      type: dataTypes.DATE
    },
    updatedAt: {
      type: dataTypes.DATE
    }
  },
    {
      tableName: "user",
      timestamps: true
    });
  User.associate = function (models) {
    User.belongsTo(models.user_category, {
      as: 'category',
      foreignKey: 'user_category_id'
    }),
      User.belongsTo(models.enterprise_detail, {
        as: 'enterprise_detail',
        foreignKey: 'user_id'
      }),
      User.hasMany(models.minting_request, {
        as: 'minting_request_id',
        foreignKey: 'minting_request_id'
      }),
      User.hasMany(models.ValidationTracking, {
        as: 'validationTrackings',
        foreignKey: 'user_id'
      });
  };

  return User;
}
