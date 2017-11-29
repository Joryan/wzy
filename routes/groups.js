var express = require('express');
var router = express.Router();


router.get('/:collectionName', function(req, res, next) {
  req.collection.find({} ,{limit: 10, sort: {'_id': -1}}).toArray(function(e, results){
  if (e) return next(e)
  res.send(results)
  });
});
router.post('/:collectionName', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results)
  });
});
router.get('/:collectionName/:groupId', function(req, res, next) {
    req.collection.findById(req.params.groupId, function(e, result){
    if (e) return next(e)
    res.send(result)
    });
});
router.put('/:collectionName/:groupId', function(req, res, next) {
    req.collection.updateById(req.params.groupId, {$set: req.body}, {safe: true, multi: false},
    function(e, result){
      if (e) return next(e)
      res.send((result === 1) ? {msg:'success'} : {msg: 'error'})
    });
});
router.delete(':collectionName/:groupId', function(req, res, next) {
    req.collection.removeById(req.params.groupId, function(e, result){
      if (e) return next(e)
      res.send((result === 1)?{msg: 'success'} : {msg: 'error'})
    });
});

module.exports=router;
