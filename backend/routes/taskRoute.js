const router = require('express').Router()
const {getTask , getTasks , createTask , updateTask , deleteTask} = require('../controllers/tasksController')

router.get('/:id' , getTask)
router.get('/' , getTasks)
router.post('/' , createTask )
router.put('/:id' , updateTask)
router.delete('/:id' , deleteTask)




module.exports = router