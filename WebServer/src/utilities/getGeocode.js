const request = require('postman-request')
const chalk = require('chalk')
//pk.eyJ1IjoieWF0aXNoMTYwNiIsImEiOiJja2FwZGhieW8xeDFwMnNwNnBsYWhzZ3VwIn0.HVRu0KQJgVDo8AmPMgv-zQ

const getGeocode = function (address, callback) {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWF0aXNoMTYwNiIsImEiOiJja2FwZGhieW8xeDFwMnNwNnBsYWhzZ3VwIn0.HVRu0KQJgVDo8AmPMgv-zQ&limit=1'
    
    request( {
        url : geocodeURL,
        json : true,
    }, function (error, {body}) {
        
        if(error) {
            callback(chalk.bgRed('ERROR : No network connection!'), undefined)
        } else if (body.features.length === 0) {
            callback(chalk.bgRed('ERROR : Could not fetch data, are you sure you typed in a correct addres?'), undefined)
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = getGeocode