const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const taskRoute = require('./routes/taskRoute')

// Create JSON file
// Implement status on the tasks

const port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/tasks' , taskRoute)

app.listen(port , () => `Listening on port ${port}`)