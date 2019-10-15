const jwt = require('jsonwebtoken');

module.exports = async function(userObject) {
  try {
    const token = await jwt.sign(userObject, process.env.JWT_SECRETKEY, { expiresIn: '1hr' });
    return token;
  } catch (err) {
    res.status(401);
    return res.json({
      error: 'token is invalid',
    });
  }
};
