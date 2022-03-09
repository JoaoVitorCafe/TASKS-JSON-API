const path = require('path')
const handleJSON = require('../handleJSON/handleJSON')

const pathToData = path.join(__dirname, '../tasks.json')

module.exports = {
    
    // @desc    Get a specific task
    // @route   GET /api/tasks/:id
    // @acess   Private
    async getTask(req ,res) {
        const { id } = req.params
        const task =  await handleJSON.findByID(pathToData, id)

        if(!task) {
            return res.status(404).json("Task not found")
        }

        if(task.user !== req.user.id){
            return res.status(401).json("You're not authorized to get this task")
        }

            
        res.status(200).json(task)
    }, 
    
    // @desc    Get all tasks from the user logged
    // @route   GET /api/tasks/
    // @acess   Private
    async getTasks(req ,res){
        const tasks = await handleJSON.getData(pathToData)

        const tasksUser = tasks.filter(task => task.user === req.user.id)
        
        res.status(200).json(tasksUser)
    } , 

    // @desc    Create a task 
    // @route   POST /api/tasks/
    // @acess   Private
    async createTask(req ,res){
        const {description , due} = req.body

        if(!description || !due) {
            return res.status(400).json("Fill in all fields")
        }
        
        const newTask = {user : req.user.id , id : handleJSON.generateID() , description , due , status : "In progress"}
        
        await handleJSON.createData(pathToData , newTask)

        res.status(201).json(newTask)
    } ,

    // @desc    Update a task 
    // @route   PUT /api/tasks/:id
    // @acess   Private
    async updateTask(req ,res){
        const { id } = req.params
        const task = await handleJSON.findByID(pathToData,id)
        
        if(!task) {
            return res.status(404).json("Task not found")
        }

        if(task.user !== req.user.id) {
            return res.status(401).json("You're unauthorized to update this task")
        }
        
        const { description , due} = req.body
        const updatedTask = {...task , description,  due}
        
        await handleJSON.updateData(pathToData , id , updatedTask)
    
        res.status(200).send(updatedTask)
        
    },

    // @desc    Delete a task 
    // @route   DELETE /api/tasks/:id
    // @acess   Private
    async deleteTask(req ,res){
        const { id } = req.params
        const task = await handleJSON.findByID(pathToData , id)
        
        if(!task) {
            return res.status(404).json("Task not found")
        }

        if(task.user !== req.user.id) {
            return res.status(401).json("You're unauthorized to update this task")
        }
        
        const deletedTask = await handleJSON.deleteData(pathToData , id)
        
        res.status(200).send(deletedTask)
    }
}