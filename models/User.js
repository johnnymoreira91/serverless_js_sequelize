const { DataTypes, Model } = require('sequelize');
const database = require('./BaseModel');
const sequelize = require('./BaseModel')

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    superUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false
    },
    passwordHash: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'invalid email'
        }
      }
    },
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    timestamps: true
  }
)

module.exports = User