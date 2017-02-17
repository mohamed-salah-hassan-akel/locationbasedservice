var express = require('express'),
        fs = require('fs'),
        app = express();
Object.assign = require('object-assign');
var assert = require('assert');
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
        ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
        mongoURL = 'mongodb://salah:programming2015@ds139909.mlab.com:39909/locationappdb';
var mongodb = require('mongodb');

MongoClient.connect(mongoURL, function (err) {
    assert.equal(null, err);
    app.use('/', function (req, res) {
        res.send({status: "connection established successfully"});
    });
});


app.listen(port, ip);
console.log("server runnibg on http://%s:%S", ip, port);
module.exports(app);