// SERVER SIDE CODE

const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname , '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

// all events associated with socket.function() are server => client
// all events associated with io.function() are client => server 
// this is reversed in chat.js as const socket = io()

io.on('connection', (socket) => {

    // this code will run when a new client is connected
    // clients.forEach(client => run io.on('connection' , ()=> {} ))

    console.log('New socket connection')

    // this will send a welcome message to a new user who has joined the chat
    socket.emit('message', 'Welcome') 

    // socket.emit() => emit a message only to that connection
    // socket.broadcat.emit() => emit a message to all except new connection

    // send a message to all users except the new user
    socket.broadcast.emit('message', "A new user just joined the chat")
    
    socket.on('sendMessage', (message, callback) => {

        const filter = new Filter()

        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', message)
        callback()
    })

    // when any user shares their location, emit that message to all users
    socket.on('sendLocation', (locationObject, callback) => {
        io.emit('message', `https://google.com/maps?q=${locationObject.latitude},${locationObject.longitude}`)
        callback()
    })

    // socket.on('disconnect') will run when any user leaves the chat or connection is broken
    socket.on('disconnect', () => {
        io.emit('message', "A user has left the chat")
    })

})


server.listen(port, ()=>{
    console.log('Server up on port ' + port)
    console.log(publicDirectoryPath)
})