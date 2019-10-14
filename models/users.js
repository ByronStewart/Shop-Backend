const { Model, DataTypes } = require('sequelize');
const db = require('./config');
const sequelize = db.sequelize;
class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'users' },
);

module.exports = User;
