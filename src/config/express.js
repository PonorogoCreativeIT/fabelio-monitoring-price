const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

const error = require('../middleware/error');
const indexRouter = require('../routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('INDONESIA!'));
app.use(session({ cookie: { maxAge: 1000 } }));
app.use(flash());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);

// Error Handler
app.use(error.error404);
app.use(error.error);

require('./cron');

module.exports = app;
