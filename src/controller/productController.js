exports.index = async (req, res, next) => {
  try {
    res.render('index', { title: 'List Data' });
  } catch (error) {
    next(error);
  }
};
