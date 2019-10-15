const { Model, DataTypes } = require('sequelize');
const Store = require('./stores');
const db = require('./config');
class Product extends Model {}
Product.init(
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize: db.sequelize, modelName: 'products' },
);
Product.belongsTo(Store);
module.exports = Product;
