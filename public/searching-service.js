
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCCU_sYtxarP9SI7U260-GGy0UdWF0DwJI'
});



var radius = 5000;


exports.searchForPlace = function (pQuery, lang,  pKeyword, pRadius, rankBy,
    pLocation, minPrice, maxPrice, openNow, pType,searchCallback) {

       
            var dataLang;
            if (lang === 'ar') {
                dataLang = 'ar';
            } else {
                dataLang = 'en';
            }
            if (pQuery === null && rankBy === null && minPrice === null && maxPrice === null) {
                googleMapsClient.placesNearby({
                    keyword:pKeyword,
                    language: dataLang,
                    location: pLocation,
                    radius: pRadius,
                    type:pType

                }, function (err, res) {
                    if (!err) {
                        searchCallback(res.json().results);
                    }
                });
            } else if (rankBy === null) {
                googleMapsClient.places({
                    query: pQuery,
                    language: dataLang,
                    location: pLocation,
                    radius:pRadius,
                    minprice: minPrice,
                    maxrice: maxPrice,
                    type:pType
                }, function (err, res) {
                    if (!err) {
                        searchCallback(res.json.results);
                    }
                });

            } else if (pQuery === null) {
                googleMapsClient.placesNearby({
                    language: dataLang,
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

            } else if (pRadius === null) {
                googleMapsClient.placesNearby({
                language: dataLang,
                location: pLocation,
                rankby: rankBy,
                minprice: minPrice,
                maxprice: maxPrice,
                opennow: openNow,
                type: pType
                },function(err,res){
                    if(!err){
                        searchCallback(res.json.results);
                    }
                });
            }
        
    
      
     
    var placePhoto = function(photoRef,callback){
        
        googleMapsClient.placesPhoto({
            photoreference:photoRef,
            maxwidth:100,
            minwidth:100
        },function(err,res){
            if(!err){
                callback(res.json.results);
            }
        });
    };
    var placeDetails = function(id,lang,callback){
        googleMapsClient.place({},function(err,res){
            if(!err){
                callback(res.json.results);
            }
        });
    };
};



