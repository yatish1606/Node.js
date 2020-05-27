const request = require('postman-request')
const chalk = require('chalk')

const getForecast = function (latitude, longitude, callback) {
    const forecastURL = 'http://api.weatherstack.com/current?access_key=19955b50fb63a14679deab2c7660cf4b&query=' + latitude  + ',' + longitude + '&units=f'
    
    request( {
        url : forecastURL,
        json : true,
    } , function (error, response) {

        if(error) {
            callback(chalk.bgRed('ERROR : No network connection!'), undefined)
        } else if (response.body.error) {
            callback(chalk.bgRed('ERROR : Could not fetch data'), undefined)
        } else {
            callback(undefined , response.body)
        }
    })
}
module.exports = getForecast