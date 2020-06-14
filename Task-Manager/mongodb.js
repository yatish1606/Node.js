const mongodb = require('mongodb')
const chalk = require('chalk')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1/27017'
const databaseName = 'TaskManager'

MongoClient.connect(connectionURL, {useNewUrlParser : true, useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return console.log(error)
    }
    // code here only runs if no error
    
    console.log(chalk.green('Connected to database'))
    const db = client.db(databaseName)

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

