var countries = require('../countries'), cities = require('../cities');
var signupLoginOpt = require('../public/signup-loginCheck');
var profile = require('../public/profileOperations');
var places = require('../public/searching-service');
var restRouter = function (app) {
    app.get('/', function (req, res) {
        res.send("Geo-location API Welcome you to our space");
    });

// POST Method to enter user details and then will be stroed in database
    /*
     * post request and his body consist of user details to register in our system
     * first namr, last name, birthddate, email, password, country, city
     */
    app.post('/signup', function (req, res) {
        var fname, lname, umail, pass, ubirthdate, ucountry, ucity, ugender;
        fname = req.body.userFname;
        lname = req.body.userLname;
        umail = req.body.email;
        ubirthdate = req.body.birthdate;
        pass = req.body.password;
        ucountry = req.body.country;
        ucity = req.body.city;
        ugender = req.body.gender;

        signupLoginOpt.signup(fname, lname, umail, pass, ubirthdate,
                ucountry, ucity, ugender, function (user) {
                    res.json(user);
                });



    });

// POST Method to enter user details and then will check if user exist or no
    app.post('/login', function (req, res) {
        var umail = req.body.email,
                pass = req.body.password;
        signupLoginOpt.login(umail, pass, function (userProfile) {
            res.json(userProfile);
        });

    });

    app.post('/chgprofilpic', function (req, res) {
        var userId = req.body.id;
        var userPic = req.body.photo;
        profile.changeProfilePic(userId, userPic, function (profilePic) {
            res.json(profilePic);
        });
    });
    app.post('/chgProfileName', function (req, res) {
        var userId = req.body.id, firstName = req.body.fName, lastName = req.body.lName;
        profile.changeProfileName(userId, firstName, lastName, function (profileName) {
            res.json(profileName);
        });
    });
    app.post('/saveCheckIns', function (req, res) {
        var userId = req.body.id, userPlaceId = req.body.placeId;
        profile.saveUserCheckIns(userId, userPlaceId, function (place) {
            res.json(place);
        });
    });
    app.post('/saveUserRates', function (req, res) {
        var userId = req.body.id, userPlaceID = req.body.placeId,
                userRate = req.body.rateScore, rateDate = req.body.rateTime;
        profile.saveUserRates(userId, userPlaceID, userRate, rateDate, function (rates) {
            res.json(rates);
        });
    });
    app.post('/saveUserFavorits', function (req, res) {
        var userId = req.body.id, userPlaceId = req.body.placeId;
        var placeDate = req.body.date;
        profile.saveUserFavorits(userId, userPlaceId, placeDate, function (favorit) {
            res.json(favorit);
        });
    });
    app.post('/saveUserVisitedPlaces', function (req, res) {
        var userID = req.body.id, userPlaceId = req.body.placeId, visiteTime = req.body.visitDate;
        profile.saveUserVisitedPlaces(userID, userPlaceId, visiteTime, function (visitedPlace) {
            res.json(visitedPlace);
        });
    });
    app.post('/saveUserQueries', function (req, res) {
        var userId = req.body.id, userQuery = req.body.query,
                keywordFilter = req.body.filter;
        profile.saveUserQueries(userId, userQuery, keywordFilter, function (userQueries) {
            res.json(userQueries);
        });
    });
    app.post('/saveUserFollow', function (req, res) {
        var userId = req.body.id, friendId = req.body.followUser;
        profile.followUserSave(userId, friendId, function (friend) {
            res.json(friend);
        });
    });
    app.post('/changeUserPassword', function (req, res) {
        var userId = req.body.id, userOldPassword = req.body.oldPassword,
                userNewPass = req.body.newPassword;
        signupLoginOpt.changePassword(userId, userOldPassword, userNewPass, function (userChgPass) {
            res.json(userChgPass);
        });
    });
    app.post('/getUser', function (req, res) {
        var userId = req.body.id;
        profile.getUserData(userId, function (userData) {
            res.json(userData);
        });
    });
    app.post('/getUserFollow', function (req, res) {
        var userId = req.body.id;
        profile.getUsersFollow(userId, function (users) {
            res.json(users);
        });
    });
    app.post('/getUserRates', function (req, res) {
        var userId = req.body.id;
        profile.getUserRates(userId, function (rates) {
            res.json(rates);
        });
    });
    app.post('/getUserFavorits', function (req, res) {
        var userId = req.body.id;
        profile.getUserFavorits(userId, function (favorits) {
            res.json(favorits);
        });
    });

    app.post('/getUserVisitedPlaces', function (req, res) {
        var userId = req.body.id;
        profile.getUserVisitedPlaces(userId, function (visitedPlaces) {
            res.json(visitedPlaces);
        });
    });
    app.post('/getNumberOfFollowers', function (req, res) {
        var userId = req.body.id;
        profile.getNumberOfFollowers(userId, function (followersNumber) {
            res.json(followersNumber);
        });
    });
    app.post('/getUserFollowers', function (req, res) {
        var userId = req.body.id;
        profile.getUserFollowers(userId, function (userFollowers) {
            res.json(userFollowers);
        });
    });
    app.post('/confirmatioCodeAcceptance', function (req, res) {
        var userMail = req.body.email, confrimationCode = req.body.code;
        signupLoginOpt.confirmatioCodeAcceptance(userMail, confrimationCode, function (confirmUser) {
            res.json(confirmUser);
        });

    });
    app.post('/getPlacesNearby', function (req, res) {
        var lang, pKeyword, pRadius,
                pLocation, pType;
        pKeyword = req.body.keyword;
        lang = req.body.language;
        pLocation = req.body.location;
        pRadius = req.body.radius;
        pType = req.body.type;
        places.searchForPlaceNearby(lang, pKeyword, pRadius,
                pLocation, pType, function (places) {
                    res.json(places);
                });


    });
    app.post('/getPlacesByQuery', function (req, res) {
        var pQuery, lang, pRadius,
                minPrice, maxPrice, openNow, pLocation, pType;
        pQuery = req.body.query;
        lang = req.body.language;
        pLocation = req.body.location;
        pRadius = req.body.radius;
        minPrice = req.body.minprice;
        maxPrice = req.body.maxprice;
        openNow = req.body.opennow;
        pType = req.body.type;
        places.searchPlacesQuery(pQuery, lang, pLocation, pRadius, minPrice, maxPrice, openNow, pType, function (placesQuery) {
            res.json(placesQuery);
        });


    });
    app.post('/getPlacesNearbyRankedBy', function (req, res) {
        var lang, rankBy,
                minPrice, maxPrice, openNow, pLocation, pType;
        lang = req.body.language;
        rankBy = req.body.rankby;
        pLocation = req.body.location;
        minPrice = req.body.minprice;
        maxPrice = req.body.maxprice;
        openNow = req.body.opennow;
        pType = req.body.type;

        places.placeNearbyRankby(lang, rankBy,
                minPrice, maxPrice, openNow, pLocation, pType, function (places) {
                    res.json(places);
                });

    });

    app.post('/getPlaceDetails', function (req, res) {
        var placeId = req.body.placeid, pLang = req.body.language;
        places.placeDetails(placeId, pLang, function (placeDetails) {
            res.json(placeDetails);
        });
    });
    app.get('/getCountries', function (req, res) {
        res.json(countries);
    });
    app.get('/getCities', function (req, res) {
        res.json(cities);
    });
};



module.exports = restRouter;