const Sequelize = require('sequelize')

class Database {
//   public connection: Sequelize

  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize({
      database: process.env.DATABASE_DB,
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      dialectModule: require('mysql2'),
      password: process.env.DATABASE_PASSWORD,
      logging: false,
      warning: false,
      pool: {
        max: 1,
        min: 0,
        idle: 0,
        acquire: 3000,
        evict: 10,
      }
    })
  }
}

const database = new Database();

module.exports = database;