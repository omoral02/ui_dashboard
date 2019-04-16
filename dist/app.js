<<<<<<< HEAD
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fs = require('fs');
let app = express();
let indexRouter = require('./routes/index.js');
let adminRouter = require('./routes/admin.js');

let filePath = path.resolve(__dirname, '..', 'public/');
const options = {
  title: 'title test',
  message: 'message test'
};
let cb = ((err)=>{
  console.log(err);
});

app.engine('html', function (filePath, options, cb) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) {return cb(err);}
    // this is an extremely simple template engine
    let rendered = content.toString().replace('<title></title>', '<title>' + options.title + '</title>')
    .replace('<h1></h1>', '<h1>' + options.message + '</h1>').
    replace('<link>', '<link rel=\'stylesheet\' src=\'./public/css/index.css\'>');
    return cb(null, rendered);
  })
});

// pug view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
=======
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
>>>>>>> 70fbacedce9301cfb920720e666c5be9eed42342

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public/')));
app.set('view engine', 'html'); // register the template engine
app.set('views', './public'); // specify the views directory
=======
app.use(express.static(path.join(__dirname, 'public')));
>>>>>>> 70fbacedce9301cfb920720e666c5be9eed42342

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
