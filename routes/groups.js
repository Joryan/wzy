var express = require('express');
var router = express.Router();
var config = require('../config');
//var MongoClient = require('mongodb').MongoClient;
var db = require('../myops/dbconn1');
/* GET chatgroup lists. */
router.get('/', function(req, res, next) {

 var promise= new Promise( (resolve,reject)=>{
//      var db= require('../myops/dbconn1');
      if (db === null) reject (err);
      else resolve(db);
 }
 ).then( (db)=>{
      console.log("from groups.js DB gotted!!" + db.databaseName);
      var cursor = db.collection(config.c2).find()
      res.send(cursor);
 }
 ).catch( (err)=>{
      console.log("from groups.js Error happennnnnned");
      console.log(err);
 }
 );


});

module.exports = router;