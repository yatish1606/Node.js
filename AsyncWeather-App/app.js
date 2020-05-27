//19955b50fb63a14679deab2c7660cf4b
const chalk = require('chalk')

const request = require('postman-request')

const url = 'http://api.weatherstack.com/current?access_key=19955b50fb63a14679deab2c7660cf4b&query=27,82'

// request( {
//     url : url,
//     json : true,
// }, function (error,response) {
    
//     console.log(response.body.current)
// })

request( {
    url :'https://api.mapbox.com/geocoding/v5/mapbox.places/starbucks.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoieWF0aXNoMTYwNiIsImEiOiJja2FveTYxNWsxYWUzMnNtdmQzb3MzcHE4In0.p2_smkpnN-jzQCBYg6HGNw&limit=1',
    json: true,
}, function(error, response) {

    const latitude = response.body.features[0].center[0]
    const longitude = response.body.features[0].center[1]

    console.log(latitude)
    console.log(longitude)
})