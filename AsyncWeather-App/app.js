//19955b50fb63a14679deab2c7660cf4b
const chalk = require('chalk')
const yargs = require('yargs')
const getGeocode = require('./utilities/getGeocode')
const getForecast = require('./utilities/getForecast')

const address = process.argv[2]

getGeocode(address, (error, recievedDataGeocode) => {

    if(error) {
        return console.log(error)
    }
    
    getForecast(recievedDataGeocode.latitude,recievedDataGeocode.longitude, (error,recievedDataForecast) => {
        if(error) {
            return console.log(error)
        }
        console.log(recievedDataGeocode.location)
        console.log(recievedDataForecast)
    })

})

yargs.parse()
