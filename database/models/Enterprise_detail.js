module.exports = (sequelize, dataTypes) => {
  const Enterprise_detail = sequelize.define('enterprise_detail', {
    user_id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cuit:{
      type: dataTypes.BIGINT,
      allowNull: false
    },
    country:{
      type: dataTypes.TEXT,
      allowNull: false
    },
    city:{
      type: dataTypes.TEXT,
      allowNull: false
    },
    employees:{
      type: dataTypes.INTEGER,
      allowNull: false
    },
    invoicing:{
      type: dataTypes.DECIMAL(25,10),
    },
    mipyme:{
      type: dataTypes.STRING(50),
      allowNull : true
    },
    createdAt:{
      type: dataTypes.DATE
    },
    updatedAt:{
      type: dataTypes.DATE
    }
  },
  {
    tableName: "enterprise_details",
    timestamps: true
  });
  Enterprise_detail.associate = function(models){
    Enterprise_detail.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    })
  }
  return Enterprise_detail;
}
