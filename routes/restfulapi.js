
var signupLoginOpt = require('../public/signup-loginCheck');
var profile = require('../public/profileOperations');
var restRouter = function (app){
    app.get('/', function(req,res){
    res.send("Geo-location API Welcome you to our space");
});

// POST Method to enter user details and then will be stroed in database
/*
 * post request and his body consist of user details to register in our system
 * first namr, last name, birthddate, email, password, country, city
 */
app.post('/signup', function (req, res) {
  var fname,lname,umail,pass,ubirthdate,ucountry,ucity,ugender;
   fname = req.body.userFname;
   lname = req.body.userLname;
   umail = req.body.email;
   ubirthdate = req.body.birthdate;
   pass = req.body.password;
   ucountry = req.body.country;
   ucity = req.body.city;
   ugender = req.body.gender;
   
   signupLoginOpt.signup(fname,lname,umail,pass,ubirthdate,
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

app.post('/chgprofilpic',function(req,res){
    var userId = req.body.id;
    var userPic = req.body.photo;
    profile.changeProfilePic(userId,userPic,function(profilePic){
        res.json(profilePic);
    });
});
app.post('/chgProfilName',function(req,res){
    var userId =req.body.id, firstName = req.body.fName, lastName = req.body.lName;
    profile.changeProfileName(userId,firstName,lastName,function(profileName){
        res.json(profileName);
    });
});
app.post('/saveCheckIns',function(req,res){
    var userId = req.body.id, userPlaceId = req.body.placeId;
    profile.saveUserCheckIns(userId,userPlaceId,function(place){
        res.json(place);
    });
});
app.post('/saveUserRates', function(req,res){
    var userId = req.body.id, userPlaceID = req.body.placeId, 
        userRate = req.body.rateScore, rateDate = req.body.rateTime;
        profile.saveUserRates(userId,userPlaceID,userRate,rateDate,function(rates){
            res.json(rates);
        });
});
app.post('/saveUserVisits',function(req,res){
    var userId = req.body.id, userPlaceId = req.body.placeId;
    profile.saveUserFavorits(userId,userPlaceId,function(favorit){
        res.json(favorit);
    });
});
app.post('/saveUserQueries',function(req, res){
    var userId = req.body.id, userQuery = req.body.query,
        keywordFilter = req.body.filter;
    profile.saveUserQueries(userId,userQuery,keywordFilter,function(userQueries){
        res.json(userQueries);
    });
});
app.post('/saveUserFollow',function(req,res){
    var userId = req.body.id, friendId = req.body.followUser;
    profile.followUserSave(userId,friendId,function(friend){
        res.json(friend);
    });
});
};

module.exports = restRouter;