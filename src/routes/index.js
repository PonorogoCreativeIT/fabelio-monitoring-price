const express = require('express');
const csrf = require('csurf');
const { check } = require('express-validator');

const csrfProtection = csrf({ cookie: { maxAge: 360 } });
const router = express.Router();
const productController = require('../controller/productController');

router
  .route('/')
  .get(csrfProtection, productController.index);

router
  .route('/add')
  .get(csrfProtection, productController.add)
  .post(
    csrfProtection,
    [
      check('urlProduct').custom((value) => {
        if (!value.startsWith('https://fabelio.com')) {
          throw new Error('Url must started with "https://fabelio.com"');
        }
        return true;
      }),
    ],
    productController.addPost,
  );

router
  .route('/detail/:refId')
  .get(csrfProtection, productController.detail);

router
  .route('/test')
  .get(productController.test);

module.exports = router;
