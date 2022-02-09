const express = require('express')
const morgan = require('morgan')
const taskRoute = require('./routes/taskRoute')

const port = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/tasks' , taskRoute)

app.listen(port , () => `Listening on port ${port}`)