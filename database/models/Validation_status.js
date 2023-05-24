module.exports = (sequelize, DataTypes) => {
  const ValidationStatus = sequelize.define('ValidationStatus', {
    validation_status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'validation_status'
  });
  ValidationStatus.associate = function(models){
    ValidationStatus.hasMany(models.ValidationTracking, {
      as: 'validationTracking',
      foreignKey: 'validation_status_id'
    })
  }

  return ValidationStatus;
};
