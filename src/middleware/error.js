exports.error404 = (req, res, next) => {
  res.render('404');
};

exports.error = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status === 403) {
    req.flash('error', err.message);
    res.redirect('/');
  } else {
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
};
