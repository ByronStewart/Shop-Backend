const db = require('./config');
const User = require('./users');
db.User = User;
module.exports = db;
