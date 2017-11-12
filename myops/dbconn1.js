var config = require('../config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


MongoClient.connect(config.dburl, function(err,db){
    assert.equal(err,null,'can not connect to DB');
    console.log("you have loginto MongoDB. The database is "+ db.databaseName);
    module.exports = db;
}
);
