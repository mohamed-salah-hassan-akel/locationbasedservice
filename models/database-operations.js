var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbUrl = 'mongodb://localhost:27017/salah'; 
// realUrl  : mongodb://salah:programming2015@ds139909.mlab.com:39909/locationappdb
exports.find = function (colName,query,callback){
    MongoClient.connect(dbUrl, function (err,db){
        assert.equal(null,err);
        db.collection(colName).find(query).toArray(function(err,docs){
            assert.equal(null,err);
            
            callback(docs);
        });
        
    });
};
exports.findProjection = function(colName,query,projection,callback){
     MongoClient.connect(dbUrl, function (err,db){
        assert.equal(null,err);
        db.collection(colName).find(query,projection).toArray(function(err,docs){
            assert.equal(null,err);
            
            callback(docs);
        });
        
    });
};

exports.insert = function(colName,query){
    MongoClient.connect(dbUrl, function(err,db){
        assert.equal(null,err);
        db.collection(colName).insertMany(query,function(err){
            assert.equal(err,null);
            console.log("inserted sucessfully");
            
        });
        db.close();
    });
};
/**
 * updates functions
 * ************************
 * 
 * 
 */
exports.updateOne = function(colName,qpart1,qpart2,callback){
   MongoClient.connect(dbUrl, function(err,db){
       assert.equal(null,err);
       
       db.collection(colName).updateOne(qpart1,qpart2, function(err,results){
           assert.equal(null,err);
           console.log(results.toString());
           callback();
       });
       db.close();
   });
};

exports.updateMany = function(colName,query,callback){
   MongoClient.connect(dbUrl, function(err,db){
       assert.equal(null,err);
       db.collection(colName).updateMany(query, function(err,results){
           assert.equal(null,err);
           console.log(results);
           callback();
       });
       db.close();
   });
};

exports.deleteOne = function(colName,query,callback){
    MongoClient.connect(dbUrl, function(err,db){
        assert.equal(null,err);
        db.collection(colName).deleteOne(query, function(err,results){
            assert.equal(null,err);
            console.log(results);
            callback();
        });
        db.close();
    });
};

