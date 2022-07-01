const { DataTypes, Model } = require('sequelize');
const database = require('./BaseModel');
const bcrypt = require('bcryptjs')
const Permission = require('./Permission');
const Address = require('./Address');

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

Permission.hasMany(User, {
  sourceKey: 'level',
  foreignKey: 'permissionLevel',
  as: 'Permissions'
})

// Address.hasMany(User, {
//   foreignKey: 'id',
//   as: 'addressId'
// })


User.addHook(
  'beforeSave',
  async (user) => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8);
    }
  }
);

module.exports = User