const router = require('express').Router()
const {getTask , getTasks , createTask , updateTask , deleteTask} = require('../controllers/tasksController')

const {protect} = require('../middleware/authMiddleware')

router.get('/:id', protect , getTask)
router.get('/' , protect , getTasks)
router.post('/' , protect , createTask )
router.put('/:id' , protect , updateTask)
router.delete('/:id' , protect , deleteTask)




module.exports = router