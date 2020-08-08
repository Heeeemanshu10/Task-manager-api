const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const useRouter =  require('../src/routers/user')
const taskRouter = require('../src/routers/task')

const app = express()
const port = 3000

// app.use((req,res,next) => {
//     res.status(503).send('Site is currently down')
// })

app.use(express.json())
app.use(useRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('servers are up and running' + port)
})

