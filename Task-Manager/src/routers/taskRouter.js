const express = require('express')
const Task = require('../models/task')

const taskRouter = new express.Router()

taskRouter.post('/tasks', async (req,res) => {
    const newTask = new Task(req.body)

    try {
        await newTask.save()
        res.status(201).send(newTask)
    } catch (e) {
        res.status(400).send(e)
    }
})

taskRouter.patch('/tasks/:taskID', async (req,res) => {

    const allowedUpdates = ['description','completed']
    const requestBodyUpdateKeys = Object.keys(req.body)
    const isValidUpdateOperation = requestBodyUpdateKeys.every( update => allowedUpdates.includes(update))

    if(!isValidUpdateOperation){
        res.status(404).send({errorMessage : 'Invalid Updates'})
    }
    
    try {
        
        const taskToPatch = await Task.findById(req.params.taskID)

        requestBodyUpdateKeys.forEach(update => taskToPatch[update] = req.body[update])
        await taskToPatch.save()

        if(!taskToPatch){
            res.status(404).send()
        }
        res.send(taskToPatch)
    } catch (e) {
        res.status(400).send(e)
    }
        
})


taskRouter.delete('/tasks/:taskID', async (req,res) => {
    try {
        const taskToDelete = await Task.findByIdAndDelete(req.params.taskID)

        if(!taskToDelete){
            res.status(404).send()
        } 
        res.send(taskToDelete)
    } catch (e) {
        res.status(400).send(e)
    }
})



taskRouter.get('/tasks', async (req,res) => {
    
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

taskRouter.get('/tasks/:taskID', async (req,res) => {
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

module.exports = taskRouter