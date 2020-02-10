const { validationResult } = require('express-validator');
const shortid = require('shortid32');
const moment = require('moment');
const statusCode = require('../config/statusCode');
const { fetchDataProduct } = require('../libs/fabelio');
const { products } = require('../config/db');
const helpers = require('../utilities/helpers');

exports.index = async (req, res, next) => {
  try {
    res.render('index', {
      title: 'List Product',
      products: products().data,
      csrfToken: req.csrfToken(),
      error: req.flash('error'),
      helpers,
      moment,
    });
  } catch (error) {
    next(error);
  }
};

exports.add = async (req, res, next) => {
  try {
    res.render('add', { title: 'Add Product', csrfToken: req.csrfToken(), error: req.flash('error') });
  } catch (error) {
    next(error);
  }
};

exports.addPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array()[0].msg);
      return res.redirect('/add');
    }
    const { body } = req;

    const isExists = products().findOne({ url: body.urlProduct });
    if (isExists) {
      req.flash('error', 'Product already exists');
      return res.redirect('/add');
    }

    const result = await fetchDataProduct(body.urlProduct);
    const refId = shortid.generate();
    products().insert({
      id: refId,
      url: result.url,
      title: result.title,
      image: result.image,
      price: result.price,
      appPrice: result.appPrice,
      currency: result.currency,
      images: result.images,
      description: result.description,
      descriptionAdditionalData: result.descriptionAdditionalData,
      processedAt: result.processedAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.redirect(`/detail/${refId}`);
  } catch (error) {
    req.flash('error', statusCode[1].message);
    return res.redirect('/add');
  }
};

exports.detail = async (req, res, next) => {
  try {
    const product = products().findOne({ id: req.params.refId });
    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/');
    }
    return res.render('detail', {
      title: 'Detail Product',
      csrfToken: req.csrfToken(),
      error: req.flash('error'),
      product,
      helpers,
      moment,
    });
  } catch (error) {
    return next(error);
  }
};

exports.test = async (_, res) => {
  try {
    const result = await fetchDataProduct('https://fabelio.com/ip/sofa-3-dudukan-hummel.html');
    res.status(statusCode[0].httpStatus).json({
      status: statusCode[0].status,
      statusCode: statusCode[0].code,
      message: statusCode[0].message,
      data: result,
    });
  } catch (error) {
    res.status(statusCode[1].httpStatus).json({
      status: statusCode[1].status,
      statusCode: statusCode[1].code,
      message: statusCode[1].message,
    });
  }
};
