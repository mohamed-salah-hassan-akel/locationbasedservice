var assert = require('assert');

var signupLoginOpt = require('../public/signup-loginCheck');

var restRouter = function (app){
    app.get('/', function(req,res){
    res.send("Geo-location API Welcome you to our space");
});

// POST Method to enter user details and then will be stroed in database
app.post('/signup', function (req, res) {
  var fname,lname,umail,pass,ucountry,ucity,ugender;
   fname = req.body.userFname;
   lname = req.body.userLname;
   umail = req.body.email;
   pass = req.body.password;
   ucountry = req.body.country;
   ucity = req.body.city;
   ugender = req.body.gender;
   signupLoginOpt.signup(fname,lname,umail,pass,
   ucountry,ucity,ugender, function(user){
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


};

module.exports = restRouter;