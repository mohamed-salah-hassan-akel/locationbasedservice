var express = require('express'),
        app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.send("hello world");
});

app.listen(port, function(){
    console.log("server running on %s", port);
});