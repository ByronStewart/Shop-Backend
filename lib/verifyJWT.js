const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    res.status(404);
    return res.json({
      error: 'forbidden',
    });
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRETKEY);
  req.username = decoded.username;
  req.email = decoded.email;
  next();
};
