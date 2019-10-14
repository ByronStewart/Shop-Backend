require('dotenv').config();
const Sequelize = require('sequelize');
const db = {};
const config = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  config: {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};
db.Sequelize = Sequelize;
db.sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config.config,
});
module.exports = db;
