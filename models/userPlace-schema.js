/*
 * create user function used to create user document that will be stored 
 * in mongo database
 * @params user id , firstName, lastName, Mail, user password, country, city
 * @param userCallback - to execute calback on user object and retrieve it
 */

var rand = require('csprng');
var random ="0";
exports.createUser = function (firstName, lastname, eMail,
        password,birthdate, country, city, gender, userToken, userSalt, usercallback) {
            var varRand = rand(24,24);
            while(random == varRand){
                varRand = rand(24,24);
            }
            var userId = 'loc_user'+ (varRand ) + 'lW5qw';
            random = varRand;
    var user = [{
            '_id': userId,
            'name': {
                'fName': firstName,
                'lName': lastname
            },
            userBirthdate:birthdate,
            'token': userToken,
            'salt': userSalt,
            'tempCode':""
            ,
            'userMail': eMail,
            'userPassword': password,
            'userAddress': {
                'userCountry': country,
                'userCity': city
            },
            'userGender': gender
            , 'favoritList': [],
            'visitedPlces': [],
            'checkIns': []
        },
        {
            userFeedbackId:userId,
            userFeedbacks:[]
        },
        {
            'userQueriesId': userId,
            'userQueries': []
        }, {
            'userRatesId': userId,
            'ratedPlaces': []
        },{
            'userProImgId':userId,
            'profileImg':[]
        },{
            'userFollowresId':userId,
            'userFollow':[]
        },{
            'userRecommendationsID':userId,
            'recommedations':[]
        }];
    usercallback(user);

};




exports.createPlace = function (placeID,nativeName,englishName,
        longtude,latitude,nativeTitleCateg, englishTitleCateg,
            nativeDesc, englishDesc,nativeTitleAddress, englishTitleAddress,
                phoneNumber,placeCallback) {
                var place = {
                    _id:placeID,
                    placeName:{
                        nativeName:nativeName,
                        englishName:englishName
                    },
                    placeCategory:{
                        nativeTitle:nativeTitleCateg,
                        englishTitle:englishTitleCateg
                    },
                    placeDescribtion:{
                        nativeDescrition:nativeDesc,
                        englishDescribtion:englishDesc
                    },
                    placeAddress:{
                        nativeTitleAddress:nativeTitleAddress,
                        englishTitleAddress:englishTitleAddress
                    },
                    location:{
                        longitude:longtude,
                        latitude:latitude
                    },
                    phoneNumber:phoneNumber,
                    placeRate:""
                    
                    
                };
                placeCallback(place);
            };


