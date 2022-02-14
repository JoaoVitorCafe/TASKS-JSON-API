const path = require('path')
const fs = require('fs')
const handleJSON = require('../handleJSON/handleJSON')

const pathToData = path.join(__dirname, '../tasks.json')

module.exports = {
    getTask(req ,res) {
        handleJSON.check(pathToData)
        const { id } = req.params
        const task =  handleJSON.findByID( pathToData, id)

        if(!task) {
            res.status(404)
            throw new Error("Task not found")
        }
            
        res.status(200).json(task)
    }, 
    
    getTasks(req ,res){
        handleJSON.check(pathToData)
        const tasks = handleJSON.get(pathToData)
        
        res.status(200).json(tasks)
    } , 

    createTask(req ,res){
        handleJSON.check(pathToData)
        const {description , due} = req.body

        if(!description || !due) {
            res.status(400)
            throw new Error("Fill in all fields")
        }
        
        const newTask = {user : req.user.id , id : handleJSON.generateID() , description , due , status : "In progress"}
        const tasks = handleJSON.get(pathToData)
        tasks.push(newTask)
        fs.writeFileSync(pathToData , JSON.stringify(tasks) , 'utf-8')
        res.status(201).json(newTask)
        
    } ,

    updateTask(req ,res){
        handleJSON.check(pathToData)
        const { id } = req.params
        const tasks = handleJSON.get(pathToData)
        let task = handleJSON.findByID(pathToData,id)
        
        if(!task) {
            res.status(404)
            throw new Error("Task not found")
        }
        
        const { description , due} = req.body
        const index = tasks.findIndex(task => task.id === id)
        const updatedTask = {...task , description,  due}
        tasks[index] = updatedTask
        fs.writeFileSync(pathToData , JSON.stringify(tasks) , 'utf-8')
    
        res.status(200).send(updatedTask)
        },

    deleteTask(req ,res){
        handleJSON.check(pathToData)
        const { id } = req.params
        const tasks = handleJSON.get(pathToData)
        const task = handleJSON.findByID(pathToData , id)
        
        if(!task) {
            res.status(404)
            throw new Error("Task not found")
        }

        const index = tasks.findIndex(task => task.id === id)
       
        const deletedTask = tasks.splice(index , 1)[0]
        fs.writeFileSync(pathToData , JSON.stringify(tasks) , 'utf-8')
        
        res.status(200).send(deletedTask)
    }
}