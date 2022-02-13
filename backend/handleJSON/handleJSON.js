const fs = require('fs')
const jwt = require('jsonwebtoken')

module.exports = {
    // Check if a JSONfile exists , if not create
    check(pathTo){
         
        if (!(fs.existsSync(pathTo))) {
            fs.writeFileSync(pathTo , JSON.stringify([]))
        }
    },

    get(pathTo) {
        const data = JSON.parse(fs.readFileSync(pathTo ,'utf-8'))
        return data
    },

    findByID(pathTo , id) {
        const data = JSON.parse(fs.readFileSync(pathTo ,'utf-8'))
        const specificData = data.find(elem => elem.id === id)
        return specificData  
    } ,

    findByEmail(pathTo , email) {
        const data = JSON.parse(fs.readFileSync(pathTo ,'utf-8'))
        const specificData = data.find(elem => elem.email === email)
        return specificData  
    } ,

    generateID(){
        const id = Math.floor(Date.now() * Math.random()).toString(36)
        return id
    } ,

    generateToken(id){
        return jwt.sign({ id } , process.env.JWT_SECRET , {
            expiresIn : '30d'
        })
    }

}