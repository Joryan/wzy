var express = require('express');
var router = express.Router();
var config = require('../config');

var mongoose = require('mongoose');
mongoose.connect(config.dburl);
var db = mongoose.connection;


db.on('error', console.error.bind(console,'DB Connection Error!!'));
db.once('open',()=>{ console.log("In app.js, the db got is "+ db.name)});

 router.param('collectionName', function(req, res, next, collectionName){
   req.collection = db.collection(collectionName);
   return next();
 });


router.get('/', function(req, res, next) {
    req.collection.find({},{limit: 10, sort: {'_id': -1}}).toArray(function(e, results){
    if (e) return next(e)
    res.send(results);
})
});
//module.exports = router;
// app.param('collectionName', function(req, res, next, collectionName){
//   req.collection = db.collection(collectionName);
//   return next();
// });



// router.get('/:collectionName', function(req, res, next) {
//     req.collection.find({},{limit: 10, sort: {'_id': -1}}).toArray(function(e, results){
//    if (e) return next(e)
//    res.send(results)
//    });
// });



// router.post('/:collectionName', function(req, res, next) {
//     req.collection.insert(req.body, {}, function(e, results){
//     if (e) return next(e)
//     res.send(results)
//   });
// });
// router.get('/:collectionName/:userId', function(req, res, next) {
//     req.collection.findByID({'userId':req.params.userId}, function(e, result){
//     if (e) return next(e)
//     res.send(result)
//     });
// });
// router.put('/:collectionName/:userId', function(req, res, next) {
//     req.collection.updateById(req.params.userId, {$set: req.body}, {safe: true, multi: false},
//     function(e, result){
//       if (e) return next(e)
//       res.send((result === 1) ? {msg:'success'} : {msg: 'error'})
//     });
// });
// router.delete(':collectionName/:userId', function(req, res, next) {
//     req.collection.removeById(req.params.userId, function(e, result){
//       if (e) return next(e)
//       res.send((result === 1)?{msg: 'success'} : {msg: 'error'})
//     });
// });

 module.exports = router;


