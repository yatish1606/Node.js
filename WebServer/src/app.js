const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getGeocode = require('./utilities/getGeocode')
const getForecast = require('./utilities/getForecast')

const app = express()
app.set('view engine', 'hbs')

const partialsPath = path.join(__dirname,'../src/partials')

app.use(express.static(path.join(__dirname, '../public')))
hbs.registerPartials(partialsPath)

app.get('/', (req,res) => {
    res.render('index', {
        title : 'Homepage',
        footerText : 'Created by me'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About',
        footerText : 'Created by me'  
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help', 
        footerText : 'Created by me'    
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        res.send({
            errorMessage:'You must provide an address'
        })
    }

    getGeocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({
                errorMessage : 'ERROR : Invalid location'
            })
        }

        getForecast(latitude,longitude, (error, forecast) => {
            if(error) {
                return res.send({
                    errorMessage : 'ERROR : No internet connection'
                })
            }
            else if (forecast.error) {
                return res.send({
                    errorMessage : 'ERROR : Could not load data'
                })
            } 
            else {
                return res.send({
                    forecast : forecast
                })
                
            }
        })
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        code : 404, 
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        code : 404,
        errorMessage : 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server up and running on port 3000')
})