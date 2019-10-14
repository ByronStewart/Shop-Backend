const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    res.status(404);
    return res.json({
      error: 'forbidden',
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRETKEY);
    req.body.username = decoded.username;
    req.body.email = decoded.email;
    next();
  } catch (err) {
    res.status(404);
    res.json({
      error: err.message,
    });
  }
};
