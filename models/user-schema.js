/*
 * create user function used to create user document that will be stored 
 * in mongo database
 * @params user id , firstName, lastName, Mail, user password, country, city
 * @param userCallback - to execute calback on user object and retrieve it
 */

var rand =0;
exports.createUser = function (firstName, lastname, eMail,
        password,birthdate, country, city, gender, userToken, userSalt, usercallback) {
    var userId = 'loc_user'+ (rand = rand +1 ) + 'lW5qwi781861dcn';

    var user = [{
            'id': userId,
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
            'userAdress': {
                'userCountry': country,
                'userCity': city
            },
            'userGender': gender
            , 'favoritList': [{'placeId': ""}],
            'visitedPlces': [{'placeId': "", 'visitingDate': ""}],
            'checkIns': []
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
        }];
    usercallback(user);

};




exports.createPlace = function () {};


