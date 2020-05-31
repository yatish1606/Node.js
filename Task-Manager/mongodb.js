const mongodb = require('mongodb')
const chalk = require('chalk')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1/27017'
const databaseName = 'TaskManager'

// const id = new ObjectID()
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser : true, useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return console.log(error)
    }
    // code here only runs if no error
    
    console.log(chalk.green('Connected to database'))
    const db = client.db(databaseName)

    // db.collection('Users').insertOne({
    //     _id : id,
    //     name : 'Tanvi',
    //     age : 43
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert new user info in database')
    //     } 
    //     console.log(result.ops)
    //     console.log(result.insertedCount)
    // })

    // db.collection('Tasks').insertMany([
    //     {
    //         description : 'Buy books',
    //         isCompleted : false
    //     }, 
    //     {
    //         description : 'Clean room',
    //         isCompleted : false
    //     }
    // ], (error, result) => {
    //     console.log(result.ops)
    //     console.log(result.insertedCount)
    // })

    // db.collection('Users').findOne({
    //     name : 'Tanvi',
    // }, (error, foundUser) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(foundUser)
    // })

    // db.collection('Tasks').find({isCompleted : false}).toArray( (error, result) => {
    //     console.log(result)
    // })

    // db.collection('Users').updateOne({
    //     name : 'Tanvi',
    // }, {
    //     $inc : {
    //         age : 1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch(error => console.log(error))


    db.collection('Tasks').updateMany({
        isCompleted : true,
    }, {
        $set : {
            isCompleted : false,
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log(error))
})

