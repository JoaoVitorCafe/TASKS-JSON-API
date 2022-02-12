const express = require('express')
const router = express.Router()
const {registerUser , loginUser , getUser} = require('../controllers/usersController')

router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.get('/user' , getUser)


module.exports = router