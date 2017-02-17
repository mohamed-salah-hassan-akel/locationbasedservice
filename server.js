var express = require('express'),
        app = express();

var port = process.env.PORT || 8080;
app.use(express.static(__dirname + "/models"));
app.use(express.static(__dirname + "/routes"));
app.use(express.static(__dirname + "/public"));

var restfulAPI = require('./routes');

app.listen(port, function(){
    console.log("server running on %s", port);
});