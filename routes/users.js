var express = require('express');
var router = express.Router();
//var db = require('../myops/dbconn');
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  //var promise = new promise( (resolve,reject)=>{
      // console.log(db.databaseName);
      // var cursor=db.collection('users').find();
      // console.log(cursor.toArray());
  //}
  //)

var promise= new Promise( (resolve, reject)=>
	{
    var dbGot;
		MongoClient.connect(config.dburl, (err,db)=>{
			if (err) {
				reject(err);
			}
				
			else {
                resolve(db);
				console.log("========From Users.js DB Connected! DB Name is " + db.databaseName+"========");
			}
		}
		);
	}

).then( (db)=>
	{
    return new Promise ( (resolve, reject)=>{
        console.log("========From User.js DB "+db.databaseName+" passed to THEN part!========");
        dbGot=db;
        console.log("db got in Promise is =>"+dbGot.databaseName);
        var cursor=db.collection(config.c1).find();
        if (cursor === null) reject(err);
        else resolve(cursor);
    
    });
  }

).then( (cursor)=>{
  //return new Pormise ( (resolve, reject){
        res.send(cursor.toArray().toString());

  //});

}
).catch ( (err)=>{
         console.log("!!!!!!!! from user.js For some reasons, DB failed to be connected!!!!!!!!");
         console.log(err);
         return process.exit();
}
);




 // res.send(cursor);
});


module.exports = router;
