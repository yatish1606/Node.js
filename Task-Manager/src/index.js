const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisisastring', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisisastring')
    console.log(data)
}

//myFunction()