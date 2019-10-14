const bcrypt = require('bcrypt');

module.exports = async function(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
