const router = require('express').Router();
const db = require('../../models/index');
const verifyToken = require('../../lib/verifyJWT');

router.use(verifyToken);

router.get('/', (req, res) => {
  const { username, email } = req.body;
  res.json({
    username,
    email,
    message: 'secret',
  });
});

router.get('/products', async (req, res) => {
  try {
    const productList = await db.Product.findAll({
      attributes: ['id', 'productName', 'description', 'price', 'thumbnail'],
    });
    res.status(200);
    return res.json({
      products: productList,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({
      error: 'internal server error',
    });
  }
});

router.get('/stores', async (req, res) => {
  try {
    const storeList = await db.Store.findAll({
      attributes: ['id', 'storeName', 'logo', 'description'],
    });
    res.status(200);
    return res.json({
      stores: storeList,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({
      error: 'internal server error',
    });
  }
});

router.get('/product/', async (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.status(400);
    return res.json({
      error: 'query must include an id',
    });
  }
  try {
    const product = await db.Product.findByPk(id);
    console.log(product);
    res.status(200);
    return res.json({
      product: product.dataValues,
    });
  } catch (err) {
    res.status(500);
    return res.json({
      error: 'internal server error',
    });
  }
});

module.exports = router;
