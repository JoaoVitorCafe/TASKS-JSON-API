const path = require('path')
const pathToData = path.join(__dirname, '../tasks.json')

const fs = require('fs')

module.exports = {
    getTask(req ,res) {
        const { id } = req.params
        fs.readFile(pathToData , (err ,data) => {
            const tasks = JSON.parse(data)
            const task = tasks.find(elem => elem.id === Number(id))
            res.status(200).json(task)
        })
    }, 
    
    getTasks(req ,res){
        res.send("Get tasks")
    } , 

    createTask(req ,res){
        res.send("Create task")
    } ,

    updateTask(req ,res){
        res.send("update task")
    } ,

    deleteTask(req ,res){
        res.send("delete task")
    }
}