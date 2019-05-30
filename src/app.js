let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fs = require('fs');
let app = express();
let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin');
const filePath = path.resolve(__dirname, '..', 'public/');

//// Simple but manual template engine//// 
//**
// const options = {
//   title: 'title test',
//   message: 'message test'
// };
// let cb = ((err)=>{
//   console.log(err);
// });
// app.engine('html', function (filePath, options, cb) { // define the template engine
//   fs.readFile(filePath, function (err, content) {
//     if (err) {return cb(err);}
//     // this is an extremely simple template engine
//     let rendered = content.toString().replace('<title></title>', '<title>' + options.title + '</title>')
//     .replace('<h1></h1>', '<h1>' + options.message + '</h1>').
//     replace('<link>', '<link rel=\'stylesheet\' src=\'./public/css/index.css\'>');
//     return cb(null, rendered);
//   })
// });
//  **/

//// Pug template engine ////
//** 
// pug view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// **/


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/')));
app.set('view engine', 'html'); // register the template engine
app.set('views', './public'); // specify the views directory

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
