// create  update delete and retrieve operation on our database
var crudeOperations = require('./public/database-operations');

var signupNewUser = require('');
// user document schema that will be stored in our database
var userSchema = require('./user-schema');
/*
 * module dependencies express is MVC framework
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dbName = 'locationappdb', dbCollectionName = 'usersCol';
var app = express();
// our server will running on port 8081 
app.listen(process.env.PORT || 8081, function () {
    var port = app.listen().address().port;
    console.log('service running now');
});
// configuration of our server 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// handling requsts errors
function handleError(res, reason, message, code) {
    console.log(error + reason);
    res.status(code || 500).json({'error': message});
}




