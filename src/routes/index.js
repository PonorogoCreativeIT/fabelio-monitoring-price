const express = require('express');

const router = express.Router();
const productController = require('../controller/productController');

router
  .route('/')
  .get(productController.index);

router
  .route('/test')
  .get(productController.test);

module.exports = router;
