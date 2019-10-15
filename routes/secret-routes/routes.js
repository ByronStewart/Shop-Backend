const router = require('express').Router();
const db = require('../../models/index');
const verifyToken = require('../../lib/verifyJWT');

const products = [
  {
    id: 1,
    name: 'grapes',
    store: "Bob's store",
    description: 'The juiciest grapes around',
    price: '$5',
  },
  {
    id: 2,
    name: 'onions',
    store: "Jerry's store",
    description: 'The juiciest onions around',
    price: '$5',
  },
  {
    id: 3,
    name: 'bananas',
    store: "Mary's store",
    description: 'The juiciest bananas around',
    price: '$5',
  },
];

router.use(verifyToken);

router.get('/', (req, res) => {
  const { username, email } = req.body;
  res.json({
    username,
    email,
    message: 'secret',
  });
});

router.get('/products', (req, res) => {
  res.json({
    products,
  });
});

module.exports = router;
