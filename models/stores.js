const { Model, DataTypes } = require('sequelize');
const User = require('./users');
const db = require('./config');

class Store extends Model {}
Store.init(
  {
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize: db.sequelize, modelName: 'stores' },
);
Store.belongsTo(User);
module.exports = Store;
