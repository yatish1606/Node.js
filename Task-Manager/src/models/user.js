const mongoose = require('mongoose')
const chalk = require('chalk')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    age : {
        type : Number,
        default : 0,
        validate(value) {
            if ( (value < 0) || (value > 120) ) {
                throw new Error(chalk.red('Invalid age!'))
            }
        }
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        validate(value) {
            if (! validator.isEmail(value)) {
                throw new Error(chalk.red('Invalid email!'))
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value) {
            if(validator.contains(value,'password')){
                throw new Error(chalk.red('Cannot contain the word password!'))
            } 
            if(value.length < 6) {
                throw new Error(chalk.red('Password must be 6 or more characters!'))
            }
        }
    },
    tokens : [{
        token : {
            type: String,
            required : true
        }
    }]
})

userSchema.methods.generateAuthenticationToken = async function () {
    const user = this
    const userToken = jwt.sign({_id : user._id.toString()}, 'thisisastring')
    user.tokens = user.tokens.concat({token : userToken})
    await user.save()
    return userToken
}

userSchema.statics.findByCredentials = async(email,password) => {
    const userToLogin = await User.findOne({email})
    
    if(!userToLogin) {
        throw new Error('Unable to log in')
    }
    
    const isMatch = await bcrypt.compare(password, userToLogin.password)

    if(!isMatch) {
        throw new Error('Unable to log in')
    }

    return userToLogin
}

userSchema.pre('save', async function (next) {
    
    const user = this
    if(user.isModified){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User