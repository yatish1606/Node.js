const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) => {
    try {
        const userToken = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(userToken, 'thisisastring')
        const user = await User.findOne({ _id : decoded._id, 'tokens.token' : userToken})

        if(!user) {
            throw new Error('Could not authenticate')
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({errorMessage : 'Please authenticate'})
    }
}

module.exports = auth