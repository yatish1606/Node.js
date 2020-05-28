//19955b50fb63a14679deab2c7660cf4b
const chalk = require('chalk')
const yargs = require('yargs')
const getGeocode = require('./utilities/getGeocode')
const getForecast = require('./utilities/getForecast')

const address = process.argv[2]

if(!address) {
    console.log(chalk.bgRed('ERROR : Invalid address'))
} else {
    getGeocode(address, (error, {latitude, longitude, location} = {} ) => {

        if(error) {
            return console.log(error)
        }
        
        getForecast(latitude,longitude, (error,recievedDataForecast) => {
            if(error) {
                return console.log(error)
            }
            console.log(location)
            console.log(recievedDataForecast)
        })
    
    })
}

yargs.parse()
