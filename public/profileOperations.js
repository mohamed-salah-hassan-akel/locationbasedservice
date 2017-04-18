/*
 * author mohamed salah hassan
 * date: 6/3/2017
 * profile operaions: - change profile pic, change profile name
 * profile operaions: - check in post save, follow person, 
 * profile operaions: - user rating or reviews
 * profile operaions: - add place to favorit places list 
 * profile operaions: - add check in a visited places
 */

var databaseOperations = require('../models/database-operations');
var colName = "usersCol";


/*
 * @param userID - id of user that will change his profile picture
 * @param imgUrl - url of user profile image
 * @callback - sending response to confirm changing profile picture
 */
exports.changeProfilePic = function (userID, imgUrl, callback) {

    databaseOperations.updateOne(colName, {userProImgId: userID}, {$push: {profileImg: imgUrl}}, function () {
        callback({"response": "done"});
    });




};
/*
 * @param userID - id of user that will change his profile name
 * @param fName - user first name111111
 * @param lName - user last name
 * @param callback - sending response to confirm changing profile name
 */
exports.changeProfileName = function (userID, firstName, lastName, callback) {
    databaseOperations.updateOne(colName, {_id: userID}, {$set: {fName: firstName, lName: lastName}}, function () {
        callback({"response": "done"});
    });
};

/*
 * @param userId - unique id for each user to save his own checkins
 * @param placeId - each place has unique id used to get place details
 * @param callaback - to confirm user if his process done or not
 */
exports.saveUserCheckIns = function (userId, placeId, checkinTime, callback) {
    databaseOperations.updateOne(colName, {_id: userId}, {$push: {checkIns: {'placeId': placeId, checkInDate: checkinTime}}}, function () {
        callback({"response": "done"});
    });
};
/*
 * @param userID  - unique id for each user to save his own rates
 * @param placeId - each place has unique id used to get place details
 * @param rate - rate score from 1 to 5 stars
 * @param rateDate - date or time of rating for certain place
 * @param callback - to confirm user if his process done or not
 */
exports.saveUserRates = function (userID, placeId, rate, rateDate, callback) {
    databaseOperations.updateOne(colName, {userRatesId: userID},
            {$push: {ratedPlaces: {'placeId': placeId, 'ratingScore': rate, 'rateTime': rateDate}}}
    , function () {
        callback({"response": "done"});
    });
};

/*
 * @param userId - user id that used to save favortits for certain user
 * @param placeId - id of favorit place
 * @param callback - callback in json form to confirm and notify the user
 */
exports.saveUserFavorits = function (userId, userPlaceId, date, callback) {
    databaseOperations.updateOne(colName, {_id: userId}, {$push: {favoritList: {'placeId': userPlaceId, placeDate: date}}}, function () {
        callback({"response": "done"});
    });
};
/*
 * @param userId - userId used to save friend that he follows
 * @param friendUserId - friend id to save his id in list of persons follow him
 * @param callback - callback to confirm the operation
 */
exports.followUserSave = function (userID, friendUserId, callback) {
    databaseOperations.updateOne(colName, {userFollowresId: userID},
            {$push: {userFollow: friendUserId}}, function () {
        callback({"response": "done"});
    });
};
/*@param userId - user id used for saving user queries
 *@param query - text pattern or searching text 
 *@param filter - keyword or pattern used for filttring search
 */
exports.saveUserQueries = function (userId, query, filter, callback) {
    databaseOperations.updateOne(colName, {userQueriesId: userId},
            {$push: {userQueries: {queryTxt: query, filtersKeywords: filter}}}, function () {
        callback({"response": "done"});
    });
};





exports.saveUserVisitedPlaces = function (userId, placeId, visitingTime, callback) {
    databaseOperations.updateOne(colName, {_id: userId}, {$push: {visitedPlces: {'placeId': placeId, visitDate: visitingTime}}}, function () {
        callback({"response": "done"});
    });
};

exports.saveFeedback = function (userId, feedbackTxt, feedbackTime, callback) {
    databaseOperations.updateOne(colName, {userFeedbackId: userId}, {$push: {userFeedbacks: {feedbackTip: feedbackTxt, feedbackDate: feedbackTime}}}, function () {
        callback({"response": "done"});
    });
};

exports.getFeedback = function (userId, callback) {
    databaseOperations.findProjection(colName, {userFeedbackId: userId}, {_id: 0, userFeedbackId: 0}, function (tips) {
        callback(tips);
    });
};
/*
 * 
 * @param {string} userID
 * @param {fuction} callback
 */

exports.getUserData = function (userId, callback) {
    var user = [];
    databaseOperations.findProjection(colName,{_id:userId},{token:0,tempCode:0,userPassword:0,salt:0},function(userInfo){
        user.push(userInfo);
        
    databaseOperations.findProjection(colName, {userFeedbackId: userId}, {_id: 0, userFeedbackId: 0}, function (feedback) {
        user.push( feedback);
        
    databaseOperations.findProjection(colName, {userRatesId: userId}, {_id: 0, userRatesId: 0}, function (rates) {
        
        user.push( rates);
        databaseOperations.findProjection(colName, {userFollowresId: userId}, {_id: 0, userFollowresId: 0}, function (followers) {
       user.push(followers);
        
         callback(user);
    });
    });


    });
        
    });
    

    
   


};
exports.getUsersFollow = function (userID, callback) {
    databaseOperations.findProjection(colName, {userFollowresId: userID}, {_id: 0, userFollowresId: 0}, function (userFollowing) {
        var users = userFollowing;
        var followUser = [];
        var usersInfo = [];

        followUser = users[0].userFollow;

        for (var i = 0; i < followUser.length; i++) {
            databaseOperations.findProjection(colName, {_id: followUser[i]},
                    {_id: 0, userGender: 0, favoritList: 0,
                        visitedPlces: 0, checkIns: 0, tempCode: 0, userBirthdate: 0, salt: 0, token: 0, userMail: 0}, function (user) {
                usersInfo.push(user);
            });
        }

        if (usersInfo.length !== 0) {
            callback(usersInfo);
        } else {
            callback({response: "List is empty"});
        }
    });

};
/*
 * userID - id of user that you want to retieve his rates on places
 * callback - callback to return result to the request of user
 */
exports.getUserRates = function (userID, callback) {
    databaseOperations.findProjection(colName, {userRatesId: userID}, {_id: 0, userRatedId: 0}, function (rates) {
        callback(rates);
    });

};
/*
 * userID - id of user that you want get back his favorit places
 * callback - function to send data to the user request
 */
exports.getUserFavorits = function (userID, callback) {
    databaseOperations.findProjection(colName, {_id: userID}, {_id: 0, name: 0, userAddress: 0, userGender: 0,
        visitedPlces: 0, checkIns: 0, tempCode: 0, userBirthdate: 0, salt: 0, token: 0, userMail: 0}, function (userFavoirts) {
        callback(userFavoirts);
    });
};
/*
 * userID - id of user that you want get back his visited places
 * callback - function to send data to the user request
 */
exports.getUserVisitedPlaces = function (userID, callabck) {
    databaseOperations.find(colName, {_id: userID},
            {_id: 0, name: 0, userAddress: 0, userGender: 0, favoritList: 0,
                tempCode: 0, userBirthdate: 0, salt: 0, token: 0, userMail: 0}, function (userPlaces) {

        callabck(userPlaces);
    });
};
/*
 *userID - id of user that you want to count his followers
 *callback - return the number of followers through callback  to user request 
 */
exports.getNumberOfFollowers = function (userID, callback) {
    databaseOperations.findProjection(colName, {userFollow: {$in: [userID]}},
            {_id: 0, userFollowresId: 0}, function (followers) {
        var numberOfFollowers = followers.length;
        callback({response: numberOfFollowers});
    });
};
/*
 * userID - id of user that you want to get his followers details
 * callback - return the  followers details through callback  to user request 
 */
exports.getUserFollowers = function (userID, callback) {
    databaseOperations.findProjection(colName, {userFollow: {$in: [userID]}},
            {_id: 0, userFollowresId: 0}, function (followers) {
        var usersFollower = [];
        for (var i = 0; i < followers.length; i++) {
            databaseOperations.findProjection(colName, {_id: followers[i]},
                    {_id: 0, favoritList: 0,
                        visitedPlces: 0, checkIns: 0, tempCode: 0, userBirthdate: 0, salt: 0, token: 0, userMail: 0}, function (userInfo) {
                usersFollower.push(userInfo);
            });
        }
        callback(usersFollower);
    });
};
