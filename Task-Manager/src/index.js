const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
    
})

app.post('/tasks', async (req,res) => {
    const newTask = new Task(req.body)

    try {
        await newTask.save()
        res.status(201).send(newTask)
    } catch (e) {
        res.status(400).send(e)
    }
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

app.get('/users', async (req,res) => {

    try {
        const users = await User.find({})
    
        if(!users) {
            return res.status(404).send()
        }

        res.status(201).send(users)
    } catch(e) {
        res.status(500).send(e)
    }
    
})

app.get('/users/:id', async (req,res) => {

    const _id = req.params.id
    
    try {
        const foundUser = await User.findById(_id)
        if(!foundUser){
            return res.status(404).send()
        }
        res.send(foundUser)
    } catch(e) {
        res.status(500).send()
    }
    
})

app.get('/tasks', async (req,res) => {
    
    try {
        const tasks = await Task.find({})

        if(!tasks){
            return res.status(404).send()
        }
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks/:taskID', async (req,res) => {
    const _id = req.params.taskID
    try {
        const foundTask = await Task.findById(_id)

        if(!foundTask){
            return res.status(404).send()
        }
        res.send(foundTask)
    } catch(e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})