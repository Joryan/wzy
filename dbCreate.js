
//// This file is for DB Initialization for WZY Project
var config = require('./config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dburl = 'mongodb://'+config.host+':'+config.port+'/'+config.dbName;
var createDB = new Promise( (resolve, reject)=>
	{
		MongoClient.connect(dburl, (err,db)=>{
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
        console.log("========DB "+db.databaseName+" will be droped soon!========");
        return new Promise( (resolve, reject) => {
            db.dropDatabase( (err,thedb)=>
            {
                if (assert.equal(err,null,'!!!DB drop Error!!!') )
                    {
                        reject(err);
                    }
                else
                    {
                        resolve(thedb);
                        console.log("========You have successfully dropped DB, DB name is "+ thedb.databaseName+"========");
                }
            });
        
        });
    }
    /////this db is passed, but it is not used!!!!
).then( (db)=>{
        return new Promise( (resolve, reject)=>
        {
            MongoClient.connect(dburl, (err,db)=>{
			if (err) {
				reject(err);
			}
				
			else {
				resolve(db);
				console.log("========DB Connected !!!!Again!!!!! DB Name is " + db.databaseName+"========");
			}
		    }
		    );
        }
        );
    }
///////////////////////////////////
).then( (db)=>{
        console.log("========We are trying to create DB =>"+db.databaseName+" and it' Collections/Docs========");
        return db;
    }
/////////////////////////////////start to insert the User/Groups/gpchats/////////////////////
).then( (db)=>{
        db.collection(config.c1).insertMany(config.c1_input, (err, res)=>{
            console.log(res);
        });
        db.collection(config.c2).insertMany(config.c2_input, (err, res)=>{
            console.log(res);
        });
        db.collection(config.c3).insertMany(config.c3_input, (err, res)=>{
            console.log(res);
        });

    
}
).catch( (err)=>{
	console.log("!! DB NOT connected or DB NOT dropped or Collection/Docs NOT inserted !!\n"+ err);
	
	return process.exit();
  }	
);

//end of createdDB



