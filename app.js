const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan = require('morgan');
const app = express();
const appRouter = require('./routes/app.route.js');
app.use(morgan('tiny'))
  // view engine setup
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/', appRouter)
  // catch 404 and forward to error handler
  .use(function (req, res, next) {
    next(createError(404));
  })
  // error handler
  .use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 404);
    res.render('error', {
      error: {
        message: "page has gone missing",
        statusCode: err.status || 404,
      }
    });
  });
module.exports = app;