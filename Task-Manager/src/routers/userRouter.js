const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const userRouter = new express.Router()

userRouter.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const userToken = await user.generateAuthenticationToken()
        res.status(201).send({user, userToken})
    } catch (e) {
        res.status(400).send(e)
    }
    
})


userRouter.patch('/users/:id', async (req,res) => {

    const allowedUpdates = ['name','email','password','age']
    const requestBodyUpdateKeys = Object.keys(req.body)
    const isValidUpdateOperation = requestBodyUpdateKeys.every( update => allowedUpdates.includes(update))

    if(!isValidUpdateOperation){
        res.status(400).send({errorMessage : 'Invalid Updates'})
    }

    try {

        const userToPatch = await User.findById(req.params.id)

        requestBodyUpdateKeys.forEach(update => userToPatch[update] = req.body[update])

        await userToPatch.save()
        
        if(!userToPatch){
            res.status(404).send()
        }
        res.send(userToPatch)
    } catch (e) {
        res.status(400).send(e)
    }
        
})

userRouter.delete('/users/:id', async (req,res) => {
    try {
        const userToDelete = await User.findByIdAndDelete(req.params.id)

        if(!userToDelete){
            res.status(404).send()
        } 
        res.send(userToDelete)
    } catch (e) {
        res.status(400).send(e)
    }
})

userRouter.get('/users/me' ,async (req,res) => {
    console.log('hi')
    console.log(req.user)
    res.send(req.user)
})

userRouter.get('/users/:id', async (req,res) => {

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

userRouter.post('/users/login', async (req,res) => {
    
    try {
        console.log('hi')
        console.log(req.body.email, req.body.password)
        const loggedInUser = await User.findByCredentials(req.body.email, req.body.password)
        console.log(loggedInUser)
        const userToken = await loggedInUser.generateAuthenticationToken()
        res.send({loggedInUser, userToken})
        console.log(userToken)
    } catch (e) {
        console.log('here')
        res.status(400).send()
    }
    
})





module.exports = userRouter