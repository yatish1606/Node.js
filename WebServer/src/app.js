const express = require('express')
const path = require('path')

const app = express()
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req,res) => {
    res.render('index', {
        title : 'thisistitel'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'Hey',     
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'odnosdfunosuefnodcn',     
    })
})

app.get('/weather', (req,res) => {
    res.send({
        forecast : 'Sunny',
        location : 'Philadelphia'
    })
})


app.listen(3000, () => {
    console.log('Server up and running on port 3000')
})