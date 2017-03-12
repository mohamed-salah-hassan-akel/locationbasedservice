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
    databaseOperations.updateOne(colName,{id:userID},{$set:{fName:firstName,lName:lastName}},function(){
        callback({"response": "done"});
    });
};

/*
 * @param userId - unique id for each user to save his own checkins
 * @param placeId - each place has unique id used to get place details
 * @param callaback - to confirm user if his process done or not
 */
exports.saveUserCheckIns = function (userId,placeId,callback) {
    databaseOperations.updateOne(colName,{id:userId},{$push:{checkIns:{'placeId':placeId}}},function(){
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
exports.saveUserRates = function (userID,placeId,rate,rateDate,callback) {
    databaseOperations.updateOne(colName,{userRatesId:userID},
        {$push:{ratedPlaces:{'placeId': placeId, 'ratingScore': rate, 'rateTime': rateDate}}}
        ,function(){
            callback({"response": "done"});
        });
};
/*
 * @param userId - user id that used to save favortits for certain user
 * @param placeId - id of favorit place
 * @param callback - callback in json form to confirm and notify the user
 */
exports.saveUserFavorits = function (userId, userPlaceId, callback) {
     databaseOperations.updateOne(colName,{id:userId},{$push:{favoritList:{'placeId':userPlaceId}}},function(){
        callback({"response": "done"});
    });
};
/*
 * @param userId - userId used to save friend that he follows
 * @param friendUserId - friend id to save his id in list of persons follow him
 * @param callback - callback to confirm the operation
 */
exports.followUserSave = function (userID,friendUserId,callback) {
    databaseOperations.updateOne(colName,{userFollowresId:userID},
        {$push:{userFollow:friendUserId}},function(){
            callback({"response": "done"});
        });
};
/*@param userId - user id used for saving user queries
 *@param query - text pattern or searching text 
 *@param filter - keyword or pattern used for filttring search
 */
exports.saveUserQueries = function(userId,query,filter,callback){
    databaseOperations.updateOne(colName,{userQueriesId:userId},
    {$push:{userQuries:{queryTxt: query, filtersKeywords:filter}}},function(){
        callback({"response": "done"});
    });
};