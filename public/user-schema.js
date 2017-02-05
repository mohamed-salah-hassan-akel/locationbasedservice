/*
 * create user function used to create user document that will be stored 
 * in mongo database
 * @params user id , firstName, lastName, Mail, user password, country, city
 * @param userCallback - to execute calback on user object and retrieve it
 */

var counter = 0;
exports.createUser = function (firstName, lastname, eMail,
        password, country, city, callback) {

    var user = {
        '_id': 'user' + (counter + 1) + 'lW',
        'name': {
            'fName': firstName,
            'lName': lastname
        },
        'userMail': eMail,
        'userPassword': password,
        'userAdress': {
            'userCountry': country,
            'userCity': city
        }
        , 'favoritList': [{'place_id': ""}], 
        'visitedPlces': [{'place_id': "", 'visiting_date': ""}]

    };
    callback(user);
    
};

exports.createUserHistory = function (userId,queryText, keywords,historyCallback) {

    var userHistory ={
        '_id': "history" + (counter + 1) + 'lw',
        'userId': userId,
        'userQueries': [
            {'queryTxt': queryText, 'filtersKeywords': keywords}
        ]
    };
    historyCallback(userHistory);
};
exports.createUserRates = function(userID,placeID,score, rateTime,rateCallback){
    var userRates ={
    '_id': "rate"+ (counter + 1) + 'lw',
    'user_id': userID,
    'rated_places': [{ 'place_id': placeID, 'rating_score': score, 'rate_time': rateTime }]
};

    rateCallback(userRates);
};


