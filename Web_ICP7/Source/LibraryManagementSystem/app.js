var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// Connecting to mongoDB using mongoose package
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean-angular6')
  .then(() => console.log('Connection to MongoDB Successful'))
  .catch((err) => console.error(err));


var apiRouter = require('./routes/book');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/books', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-details/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-create', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-edit/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/api', apiRouter);

app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;