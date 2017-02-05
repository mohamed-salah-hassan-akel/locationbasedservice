
// To connect Mongodb instance
var MongoClient = require('mongodb').MongoClient;

// to handle exceptions or make sure the result will be correct
var assert = require('assert');

/*
 * connect method take url of your database server and the name of user in
 * current database
 * @param1 url - url or location of your database server
 * @param2 databaseNameUserName - user of DBMS or user from your creation
 * @param3 
 * 
 */
var connect = function(databaseNameUserName, databaseCallback){
    //
    var dbUrl = 'mongodb://salah:programming2015@ds139909.mlab.com:39909/'
            + databaseNameUserName;
    /*
     * 
     */
    MongoClient.connect(dbUrl, function(error, database){
        //
        assert.equal(null,error);
        console.log("connection is established correctly");
        databaseCallback(database);
    });
    
};

exports.insert = function(datbaseName,collectionName,insertQuery){
    connect(datbaseName,function(database){
        var collection = database.collection(collectionName);
        collection.insertOne(insertQuery,function(err, r){
            assert.equal(null,err);
            assert.equal(1,r.insertedCount);
            console.log('insert succesfully');
            database.close();
        });
        
        
    });
    
};


