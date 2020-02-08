const statusCode = require('../config/statusCode');
const { fetchDataProduct } = require('../libs/fabelio');

const db = require('../config/db');

exports.index = async (req, res, next) => {
  try {
    console.log(db.getCollection('links').data);
    res.render('index', { title: 'List Data' });
  } catch (error) {
    next(error);
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
