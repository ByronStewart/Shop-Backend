const jwt = require('jsonwebtoken');

module.exports = async function(userObject) {
  const token = await jwt.sign(userObject, process.env.JWT_SECRETKEY);
  return token;
};
