var assert = require('assert');

var signupLoginOpt = require('../public/signup-loginCheck');

var restRouter = function (app){

// POST Method to enter user details and then will be stroed in database
app.post('/signup', function (req, res) {
   var fname,lname,umail,pass,ucountry,ucity;
   fname = req.body.userFname;
   lname = req.body.userLname;
   umail = req.body.email;
   pass = req.body.password;
   ucountry = req.body.country;
   ucity = req.body.city;
   signupLoginOpt.signup(fname,lname,umail,pass,ucountry,ucity, function(user){
       res.json(user);
   });
   
});

// POST Method to enter user details and then will check if user exist or no
app.post('/login', function(req, res){
    var umail = req.body.email,
   pass = req.body.password;
    signupLoginOpt.login(umail, pass,function(userProfile){
        res.json(userProfile);
    });
});

app.get('/data', function (req, res) {
    res.json({"title": "hello"});
});
};

module.exports = restRouter;