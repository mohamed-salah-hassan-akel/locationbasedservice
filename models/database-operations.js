var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbUrl = 'mongodb://salah:programming2015@ds139909.mlab.com:39909/';

exports.find = function (database,colName,query,callback){
    MongoClient.connect(dbUrl+database, function (err,db){
        assert.equal(null,err);
        var cursor = db.collection(colName).find(query);
        cursor.each(function (err, doc){
            assert.equal(null,err);
            if(doc!==null){
                callback(doc);
            }else{callback();}
        });
        db.close();
    });
};

exports.Insert = function(dbName,colName,query,callback){
    MongoClient.connect(dbUrl+dbName, function(err,db){
        assert.equal(null,err);
        db.collection(colName).insertMany(query,function(err,result){
            assert.equal(err,null);
            console.log("inserted sucessfully");
            callback();
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
exports.updateOne = function(dbName,colName,query,callback){
   MongoClient.connect(dbUrl+dbName, function(err,db){
       assert.equal(err,null);
       db.collection(colName).updateOne(query, function(err,results){
           assert.equal(err,null);
           console.log(results);
           callback();
       });
       db.close();
   });
};

exports.updateMany = function(dbName,colName,query,callback){
   MongoClient.connect(dbUrl+dbName, function(err,db){
       assert.equal(err,null);
       db.collection(colName).updateMany(query, function(err,results){
           assert.equal(err,null);
           console.log(results);
           callback();
       });
       db.close();
   });
};

exports.deleteOne = function(dbName,colName,query,callback){
    MongoClient.connect(dbUrl+dbName, function(err,db){
        assert.equal(err,null);
        db.collection(colName).deleteOne(query, function(err,results){
            console.log(results);
            callback();
        });
        db.close();
    });
};