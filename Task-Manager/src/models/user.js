const mongoose = require('mongoose')
const chalk = require('chalk')
const validator = require('validator')

const User = mongoose.model('User', {
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
    }
})

module.exports = User