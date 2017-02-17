var express = require('express'),
        fs = require('fs'),
        app = express(),
        ejs = require('ejs'),
        morgan = require('morgan');
Object.assign = require('object-assign');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
        ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
app.listen(port,ip);
console.log("server runnibg on http://%s:%S",ip,port);
module.exports(app);