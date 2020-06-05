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
        res.status(404).send({errorMessage : 'Invalid Updates'})
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

userRouter.get('/users', auth ,async (req,res) => {

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
        const loggedInUser = await User.findByCredentials(req.body.email, req.body.password)
        const userToken = await loggedInUser.generateAuthenticationToken()
        res.send({loggedInUser, userToken})
    } catch (e) {
        res.status(400).send()
    }
    
})





module.exports = userRouter