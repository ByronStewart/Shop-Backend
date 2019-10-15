const db = require('./config');
const User = require('./users');
const Product = require('./products');
const Store = require('./stores');
db.User = User;
db.Store = Store;
db.Product = Product;
module.exports = db;
