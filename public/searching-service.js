
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCCU_sYtxarP9SI7U260-GGy0UdWF0DwJI'
});





exports.searchForPlaceNearby = function (lang, pKeyword, pRadius,
        pLocation, pType, searchCallback) {

    googleMapsClient.placesNearby({
        keyword: pKeyword,
        language: lang,
        location: pLocation,
        radius: pRadius,
        type: pType

    }, function (error, response) {
        if (!error) {
            var placesData;
            placesData = response.json.results;
            searchCallback(placesData);
        }
    });

};
exports.searchPlacesQuery = function (pQuery, lang, pLocation, pRadius, minPrice, maxPrice, openNow, pType, searchCallback) {
    googleMapsClient.places({
        query: pQuery,
        language: lang,
        location: pLocation,
        radius: pRadius,
        minprice: minPrice,
        maxprice: maxPrice,
        opennow: openNow,
        type: pType
    }, function (err, res) {
        if (!err) {
            searchCallback(res.json.results);
        }
    });
};
exports.searchForPlaceNearbyPriceFilter = function (lang, pRadius,
        minPrice, maxPrice, openNow, pLocation, pType, searchCallback) {

    googleMapsClient.placesNearby({
        language: lang,
        location: pLocation,
        radius: pRadius,
        minprice: minPrice,
        maxprice: maxPrice,
        opennow: openNow,
        type: pType
    }, function (err, res) {
        if (!err) {
            searchCallback(res.json.results);
        }
    });

};
exports.placeNearbyRankby = function (lang, rankBy,
        minPrice, maxPrice, openNow, pLocation, pType, searchCallback) {

    googleMapsClient.placesNearby({
        language: lang,
        location: pLocation,
        rankby: rankBy,
        minprice: minPrice,
        maxprice: maxPrice,
        opennow: openNow,
        type: pType
    }, function (err, res) {
        if (!err) {
            searchCallback(res.json.results);
        }
    });
};




var placePhoto = function (photoRef, callback) {

    googleMapsClient.placesPhoto({
        photoreference: photoRef,
        maxwidth: 100,
        minwidth: 100
    }, function (err, res) {
        if (!err) {
            callback(res.json.results);
        }
    });
};
exports.placeDetails = function (id, lang, callback) {
    googleMapsClient.place({
        placeid: id,
        language: lang
    }, function (err, res) {
        if (!err) {
            callback(res.json.results);
        }
    });
};




