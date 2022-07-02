const { DataTypes, Model } = require('sequelize');
const database = require('./BaseModel');
const User = require('./User');

class Permission extends Model { }

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    timestamps: true
  }
)

Permission.hasMany(User, {
  sourceKey: 'level',
  foreignKey: 'permissionLevel',
  as: 'PermissionsId'
})

module.exports = Permission
