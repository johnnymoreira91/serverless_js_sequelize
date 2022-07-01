const { DataTypes, Model } = require('sequelize');
const database = require('./BaseModel');
const User = require('./User');

class Address extends Model { }

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    timestamps: true
  }
)

module.exports = Address