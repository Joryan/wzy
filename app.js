var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');


//DB connection
var mongoose = require('mongoose');
mongoose.connect(config.dburl);
var db = mongoose.connection;

console.log("check points 2")
db.on('error', console.error.bind(console,'DB Connection Error!!'));
db.once('open',()=>{ console.log("In app.js, the db got is "+ db)});
//var db= require('./myops/dbconn');
//var db=mydb();
//console.log("In app.js, the db we got is ==> "+ db.databaseName);

var index = require('./routes/index');
var users = require('./routes/users');
var groups = require('./routes/groups');
var gprecords = require('./routes/gprecords');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//app.use('/groups',groups);
//app.use('/gprecords',gprecords);
//-----------------------------------------------------

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
});

app.get('/:collectionName', function(req, res, next) {
  req.collection.find({} ,{limit: 10, sort: {'_id': -1}}).toArray(function(e, results){
  if (e) return next(e)
  res.send(results)
  });
});
app.post('/:collectionName', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results)
  });
});
app.get('/:collectionName/:userId', function(req, res, next) {
    req.collection.findById(req.params.userId, function(e, result){
    if (e) return next(e)
    res.send(result)
    });
});
app.put('/:collectionName/:userId', function(req, res, next) {
    req.collection.updateById(req.params.userId, {$set: req.body}, {safe: true, multi: false},
    function(e, result){
      if (e) return next(e)
      res.send((result === 1) ? {msg:'success'} : {msg: 'error'})
    });
});
app.delete(':collectionName/:userId', function(req, res, next) {
    req.collection.removeById(req.params.userId, function(e, result){
      if (e) return next(e)
      res.send((result === 1)?{msg: 'success'} : {msg: 'error'})
    });
});






//------------------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
