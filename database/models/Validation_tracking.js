module.exports = (sequelize, DataTypes) => {
  const ValidationTracking = sequelize.define('ValidationTracking', {
    minting_request_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    user_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    validation_status_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'validation_tracking'
  });
  ValidationTracking.associate = function(models) {
    ValidationTracking.belongsTo(sequelize.models.minting_request, {
      as: 'mintingRequest',
      foreignKey: 'minting_request_id'
    }),
    ValidationTracking.belongsTo(sequelize.models.user, {
      as: 'user',
      foreignKey: 'user_id'
    }),
    ValidationTracking.belongsTo(sequelize.models.validation_status, {
      as: 'status',
      foreignKey: 'validation_status_id'
    })
  }

  return ValidationTracking;
};
