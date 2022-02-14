const fs = require('fs')
const jwt = require('jsonwebtoken')

module.exports = {
    // Check if a JSONfile exists , if not create
    check(pathTo){
         
        if (!(fs.existsSync(pathTo))) {
            fs.writeFileSync(pathTo , JSON.stringify([]))
        }
    },

    // Get all the data from the JSON file according to the name of file and its path.
    get(pathTo) {
        const data = JSON.parse(fs.readFileSync(pathTo ,'utf-8'))
        return data
    },

    // Get a specific data from the JSON file according to the name of file ,its path and id.
    findByID(pathTo , id) {
        const data = JSON.parse(fs.readFileSync(pathTo ,'utf-8'))
        const specificData = data.find(elem => elem.id === id)
        return specificData  
    } ,

    // Get a specific data from the JSON file according to the name of file ,its path and email.
    findByEmail(pathTo , email) {
        const data = JSON.parse(fs.readFileSync(pathTo ,'utf-8'))
        const specificData = data.find(elem => elem.email === email)
        return specificData  
    } ,

    // Generate a ID
    generateID(){
        const id = Math.floor(Date.now() * Math.random()).toString(36)
        return id
    } ,
}