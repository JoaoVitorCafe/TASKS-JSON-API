const path = require('path')
const pathToData = path.join(__dirname, '../tasks.json')

const fs = require('fs')

module.exports = {
    getTask(req ,res) {
        const { id } = req.params
        fs.readFile(pathToData , (err ,data) => {
            const tasks = JSON.parse(data)
            const task = tasks.find(elem => elem.id === Number(id))
            
            if(!task)
                res.status(404).json("Task not found")
            
            res.status(200).json(task)
        })
    }, 
    
    getTasks(req ,res){
        fs.readFile(pathToData , (err ,data) => {
            const tasks = JSON.parse(data)
            res.status(200).json(tasks)
        })
    } , 

    createTask(req ,res){
        fs.readFile(pathToData , (err ,data) => {
            const newTask = {id :Number(req.body.id) , task : req.body.task , due : req.body.due}
            const tasks = JSON.parse(data)
            tasks.push(newTask)
            fs.writeFileSync(pathToData , JSON.stringify(tasks) , 'utf-8')
            res.status(201).json(newTask)
        })
    } ,

    updateTask(req ,res){
        fs.readFile(pathToData , (err ,data) => {
            const tasks = JSON.parse(data)
            let task = tasks.find(elem => elem.id === Number(req.params.id))
            const index = tasks.indexOf(task)
            const updatedTask = {...task , id : req.body.id , task : req.body.task , due : req.body.due}
            tasks[index] = updatedTask
            fs.writeFileSync(pathToData , JSON.stringify(tasks) , 'utf-8')
        
            res.status(200).send(updatedTask)

        })
    },

    deleteTask(req ,res){
        fs.readFile(pathToData , (err ,data) => {
            const tasks = JSON.parse(data)
            let deletedTask = tasks.find(elem => elem.id === Number(req.params.id))
            const index = tasks.indexOf(deletedTask)
            tasks.splice(index , 1)
            fs.writeFileSync(pathToData , JSON.stringify(tasks) , 'utf-8')
        
            res.status(200).send(deletedTask)

        })

    }
}