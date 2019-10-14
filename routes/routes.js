const router = require('express').Router();
const db = require('../models/index');
const signJWT = require('../lib/signjwt');
const encryptPass = require('../lib/encryptPass');
const comparePass = require('../lib/comparePass');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //TODO escaping queries

  if (!(email && password)) {
    res.status(400);
    return res.json({
      error: 'either an email or password was not provided',
    });
  }
  try {
    const user = await db.User.findOne({
      where: { email },
      attributes: ['username', 'email', 'password'],
    });
    const passwordIsMatch = await comparePass(password, user.password);
    if (!(user.email === email && passwordIsMatch)) {
      res.status(401);
      return res.json({
        error: 'incorrect email or password',
      });
    }
    const token = await signJWT({ username: user.username, email: user.email });
    res.status(200);
    return res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({
      error: 'internal server error',
    });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username && email && password)) {
    res.status(404);
    return res.json({
      error: 'registration must include a username, email and password',
    });
  }
  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!!user) {
      res.status(300);
      return res.json({
        error: 'email already registered',
      });
    }
    const hash = await encryptPass(password);
    await db.User.create({
      username,
      email,
      password: hash,
    });
    const token = await signJWT({ username, email });
    res.status(201);
    return res.json({
      token,
      user: {
        username,
        email,
      },
    });
  } catch (err) {
    res.status(500);
    console.log(err);
    return res.json({
      error: 'internal server error',
    });
  }
});

module.exports = router;
