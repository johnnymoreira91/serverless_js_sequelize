const { DataTypes, Model } = require('sequelize');
const Address = require('./Address');
const Bank = require('./Bank');
const database = require('./BaseModel');

class BankBranch extends Model { }

BankBranch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    timestamps: true
  }
)

Bank.hasMany(BankBranch, {
  foreignKey: 'bankId',
  as: 'bank'
})
Address.hasMany(BankBranch, {
  foreignKey: 'addressId',
  as: 'addressBank'
})

module.exports = BankBranch
