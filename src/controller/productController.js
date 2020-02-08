const db = require('../config/db');

exports.index = async (req, res, next) => {
  try {
    console.log(db.getCollection('links').data);
    res.render('index', { title: 'List Data' });
  } catch (error) {
    next(error);
  }
};
