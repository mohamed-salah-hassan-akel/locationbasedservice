var express = require('express'),
        http = require('http'),
        app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
        ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.listen(port,ip, function (){
    app.get('/', function(req, res){
        res.send("hello world");
    });
});