const express = require('express')
const path = require('path')
const hbs = require('hbs')

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
    res.send({
        forecast : 'Sunny',
        location : 'Philadelphia',
        title: 'weather',
        footerText : 'Created by me'
    })
})


app.listen(3000, () => {
    console.log('Server up and running on port 3000')
})