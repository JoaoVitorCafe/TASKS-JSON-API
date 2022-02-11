const path = require('path')
const fs = require('fs')

const pathToData = path.join(__dirname, '../tasks.json')

module.exports = {
    // Check if a JSONfile exists , if not create
    check(){
         
        if (!(fs.existsSync(pathToData))) {
            fs.writeFileSync(pathToData , JSON.stringify([]))
        }
    },

    send() {
        const tasks = JSON.parse(fs.readFileSync(pathToData ,'utf-8'))
        return tasks
    },

    find(id) {
        const tasks = JSON.parse(fs.readFileSync(pathToData ,'utf-8'))
        const task = tasks.find(task => task.id === id)
        return task
        
    } ,

    identify(){
        const id = Math.floor(Date.now() * Math.random()).toString(36)
        return id
    }

}