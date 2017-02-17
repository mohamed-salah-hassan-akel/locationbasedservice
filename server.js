var express = require('express'),
        app = express(),
        bodyParser = require('body-parser');

var assert = require('assert');

var port = process.env.PORT || 8080;
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var restapiRoutes = require('./routes/restfulapi')(app);

app.listen(port, function(){
    console.log("server running on %s", port);
});