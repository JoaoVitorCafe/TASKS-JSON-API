const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require("dotenv").config();
const taskRoute = require('./routes/taskRoute')
const userRoute = require('./routes/userRoute')

const port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/tasks' , taskRoute)
app.use('/api/users' , userRoute)


app.listen(port , () => console.log(`Listening on port ${port}`))