const { DataTypes, Model } = require('sequelize');
const database = require('./BaseModel');

class Status extends Model { }

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    timestamps: true
  }
)

module.exports = Status