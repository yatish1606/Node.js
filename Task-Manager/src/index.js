const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/tasks', (req,res) => {
    const newTask = new Task(req.body)

    newTask.save()
        .then(()=>res.status(201).send(newTask))
        .catch((e) => {res.status(400).send(e)})
})

app.patch('/users/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id, {name : 'John'})
        .then(updatedUser => res.send(updatedUser))
        .catch(e => res.status(400).send(e))
})

app.patch('/tasks/:taskID', (req,res) => {
    Task.findByIdAndUpdate(req.params.taskID, {description : 'Changed'})
        .then(updatedTask => res.send(updatedTask))
        .catch(e => res.status(400).send(e))
})

app.get('/users', (req,res) => {
    User.find({})
        .then( users => res.status(200).send(users))
        .catch(e => res.status(500).send(e))
})

app.get('/users/:id', (req,res) => {

    const _id = req.params.id
    User.findById(_id)
        .then(user => {
            if(!user) {
                res.status(404).send()
            }
            res.send(user)
        })
        .catch(e => res.status(500).send())
})

app.get('/tasks', (req,res) => {
    Task.find({})
        .then( tasks => res.status(200).send(tasks))
        .catch(e => res.status(500).send(e))
})

app.get('/tasks/:taskID', (req,res) => {
    Task.findById(req.params.taskID)
        .then( task => {
            if(!task) {
                res.status(404).send()
            }

            res.send(task)
        })
        .catch(e => res.status(500).send())
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})