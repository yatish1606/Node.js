// SERVER SIDE CODE

const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const Filter = require('bad-words')
const utilityFunctions = require('./utils/messages')
const userFunctions = require('./utils/users')

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

    
    // join a specific chat room 
    socket.on('join', (options, callback) => {

        const {error, user} = userFunctions.addUser({
            id : socket.id,
            ...options
        })

        if(error) {
            return callback(error)
        }

        socket.join(user.room)

        // this will send a welcome message to a new user who has joined the chat
        socket.emit('message', utilityFunctions.generateMessage('Sys : ','Welcome')) 

        // socket.emit() => emit a message only to that connection
        // socket.broadcat.emit() => emit a message to all except new connection

        // send a message to all users except the new user
        socket.broadcast.to(user.room).emit('message', utilityFunctions.generateMessage('Sys : ',`${user.username} has joined the chat`))
        
        io.to(user.room).emit('roomData', {
            room : user.room,
            users : userFunctions.getUsersInRoom(user.room)
        })
        callback()
    })
    
    socket.on('sendMessage', (message, callback) => {

        const user = userFunctions.getUser(socket.id)
        
        if(new Filter().isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', utilityFunctions.generateMessage(user.username,message))
        callback()
    })

    // when any user shares their location, emit that message to all users
    socket.on('sendLocation', (locationObject, callback) => {
        const user = userFunctions.getUser(socket.id)
        io.to(user.room).emit('locationMessage', utilityFunctions.generateLocationMessage(user.username,`https://google.com/maps?q=${locationObject.latitude},${locationObject.longitude}`))
        callback()
    })

    // socket.on('disconnect') will run when any user leaves the chat or connection is broken
    socket.on('disconnect', () => {      
        const removedUser = userFunctions.removeUser(socket.id)

        if(removedUser) {
            io.to(removedUser.room).emit('message', utilityFunctions.generateMessage('Sys : ',`${removedUser.username} has left the chat`))
            
            io.to(removedUser.room).emit('roomData', {
                room : removedUser.room,
                users : userFunctions.getUsersInRoom(removedUser.room)
            })
        }
    })

    

})


server.listen(port, ()=>{
    console.log('Server up on port ' + port)
    console.log(publicDirectoryPath)
})