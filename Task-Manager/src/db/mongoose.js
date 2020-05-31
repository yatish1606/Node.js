const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex : true, 
    useNewUrlParser : true,
    useUnifiedTopology : true
})

// const User = mongoose.model('User', {
//     name : String,
//     age : Number
// })

// const me = new User ({
//     name : 'Yatish',
//     age : 19
// })

// me.save()
//     .then(result => console.log(result))
//     .catch(error => console.log(error))

const Task = mongoose.model('Task', {
    description : String,
    isCompleted : Boolean,
})

const myTask = new Task ({
    description : 'Study for exam',
    isCompleted : false
})

myTask.save()
    .then(result => console.log(result))
    .catch(error => console.log(error))