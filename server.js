var express = require('express'),
        app = express(),
        bodyParser = require('body-parser');

var assert = require('assert');

var port = process.env.PORT || 8080;
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', function(req,res){
    res.send("Geo-location API Welcome you to our space");
});
var restapiRoutes = require('./routes/restfulapi')(app);

app.listen(port, function(){
    console.log("server running on %s", port);
});