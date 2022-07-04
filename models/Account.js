const { DataTypes, Model } = require('sequelize');
const database = require('./BaseModel');
const BankBranch = require('./BankBranch');
const User = require('./User');

class Account extends Model { }

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    money: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    limit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    timestamps: true
  }
)
User.hasMany(Account, {
  foreignKey: 'userId', 
  as: 'userAccount'
})
BankBranch.hasMany(Account, {
  // sourceKey: 'number',
  foreignKey: 'agencyId',
  as: 'bankBranchAccount'
})
Account.belongsTo(User, {
  foreignKey: 'accountId',
  as: 'accountUser'
})

module.exports = Account
