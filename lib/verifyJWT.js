const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  let token = req.headers['authorization'];
  if (!token) {
    res.status(404);
    return res.json({
      error: 'forbidden',
    });
  }
  token = token.split(' ')[1];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRETKEY);
    req.body.username = decoded.username;
    req.body.email = decoded.email;
    next();
  } catch (err) {
    res.status(401);
    res.json({
      error: err.message,
    });
  }
};
