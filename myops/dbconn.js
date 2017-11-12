// This Module is to export the db connection to localhost Mongodb. Collection is chatroom


var config = require('../config');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbInstance;
var dbconn = new Promise( (resolve, reject)=>
	{
        var dbGot;
		MongoClient.connect(config.url, (err,db)=>{
			if (err) {
				reject(err);
			}
				
			else {
                resolve(db);
				console.log("========DB Connected! DB Name is " + db.databaseName+"========");
			}
		}
		);
	}

).then( (db)=>
	{
        console.log("========DB "+db.databaseName+" passed to THEN part!========");
        dbGot=db;
        console.log("db got in Promise is =>"+dbGot.databaseName);
        dbInstance=dbGot;
        console.log("In Then, the global dbInstance is => "+dbInstance.databaseName);
        //return dbGot;
        module.exports = module.dbInstance;
    }

).catch ( (err)=>{
         console.log("!!!!!!!! For some reasons, DB failed to be connected!!!!!!!!");
         return process.exit();
}
);

//var dbInstance =dbconn;
//console.log(dbInstance);
//console.log(dbInstance.databaseName);
//function expdb(x){return x}
//module.exports = expdb(dbInstance);