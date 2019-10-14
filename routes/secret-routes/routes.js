const router = require('express').Router();
const db = require('../../models/index');
const verifyToken = require('../../lib/verifyJWT');

router.use(verifyToken);

router.get('/', (req, res) => {
  res.json({
    message: 'secret',
  });
});

module.exports = router;
