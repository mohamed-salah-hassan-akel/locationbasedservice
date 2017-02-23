/*
 * create user function used to create user document that will be stored 
 * in mongo database
 * @params user id , firstName, lastName, Mail, user password, country, city
 * @param userCallback - to execute calback on user object and retrieve it
 */

var counter = 0;
exports.createUser = function (firstName, lastname, eMail,
        password, country, city, gender, userToken, userSalt, callback) {
    var userId = 'loc_user' + (counter + 1) + 'lW';

    var user = [{
            'id': userId,
            'name': {
                'fName': firstName,
                'lName': lastname
            },
            'token': userToken,
            'salt': userSalt
            ,
            'userMail': eMail,
            'userPassword': password,
            'userAdress': {
                'userCountry': country,
                'userCity': city
            },
            'userGender': gender
            , 'favoritList': [{'place_id': ""}],
            'visitedPlces': [{'place_id': "", 'visiting_date': ""}],
            'checkIns': [{
                    'placeId': ""

                }]
        },
        {
            'userId': userId,
            'userQueries': [
                {'queryTxt': queryText, 'filtersKeywords': keywords}
            ]
        }, {
            'user_id': userId,
            'rated_places': [{'place_id': placeID, 'rating_score': score, 'rate_time': rateTime}]
        }];
    callback(user);

};




exports.createPlace = function () {};


