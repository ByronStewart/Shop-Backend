const jwt = require('jsonwebtoken');

module.exports = async function(userObject) {
  try {
    const token = await jwt.sign(userObject, process.env.JWT_SECRETKEY, { expiresIn: 15 });
    return token;
  } catch (err) {
    res.status(500);
    return res.json({
      error: 'internal server error',
    });
  }
};
