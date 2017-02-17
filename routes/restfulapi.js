var assert = require('assert');

var signupLoginOpt = require('../public/signup-loginCheck');

app.post('/signup', function(req, res){
    signupLoginOpt.signup(res.body.fname,res.body.lname,res.body.email,
    res.body.password,res.body.country,res.body.city, function(rescallback){
        app.get('/signup', function(req, res){
            res.json(rescallback);
        } );
    });
});

