const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname , '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
    console.log('New socket connection')

    socket.emit('message', 'Welcome')
    
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })
})


server.listen(port, ()=>{
    console.log('Server up on port ' + port)
    console.log(publicDirectoryPath)
})