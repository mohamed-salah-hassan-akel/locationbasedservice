var assert = require('assert');

var signupLoginOpt = require('../public/signup-loginCheck');

var restRouter = function (app){
    app.get('/', function(req,res){
    res.send("Geo-location API Welcome you to our space");
});

// POST Method to enter user details and then will be stroed in database
app.post('/signup', function (req, res) {
   var newUser = {
       fname:String,
       lname:String,
       umail:String,
       pass:String,
       ucountry :String,
       ucity:String,
        ugende:String
   }
   newUser.fname = req.body.userFname;
   newUser.lname = req.body.userLname;
   newUser.umail = req.body.email;
   newUser.pass = req.body.password;
   newUser.ucountry = req.body.country;
   newUser.ucity = req.body.city;
   newUser.ugender = req.body.gender;
   signupLoginOpt.signup(newUser.fname,newUser.lname,newUser.umail,newUser.pass,
   newUser.ucountry,newUser.ucity,newUser.ugender, function(user){
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