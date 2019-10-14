const bcrypt = require('bcrypt');

module.exports = async function(password) {
  try {
    const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTROUNDS));
    return hash;
  } catch (err) {
    throw err;
  }
};
