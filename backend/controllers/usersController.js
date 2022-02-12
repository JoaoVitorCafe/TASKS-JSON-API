const path = require('path')
const fs = require('fs')
const handleJSON = require('../handleJSON/handleJSON')
const pathToUsers = path.join(__dirname , '../users.json')

module.exports = {
    registerUser(req , res) {
        handleJSON.check(pathToUsers)

        const {name , email , password} = req.body

        if(!name || !email || !password)
            res.status(400).send({message : "Please add all fields"})

        const userExists = handleJSON.find(pathToUsers , email)

        if(userExists)
            res.status(400).send({message : "User already exists"})
        
        const user = { id : handleJSON.generateID() ,
            name ,
            email ,
            password,
        }
   
        const users = handleJSON.get(pathToUsers)
        users.push(user)

        fs.writeFileSync(pathToUsers , JSON.stringify(users) , 'utf-8')
        res.status(201).json({...user , token : handleJSON.generateToken(user.id)})
    } ,

    loginUser(req , res) {
        handleJSON.check(pathToUsers)

        const { email , password} = req.body

        if(!email || !password)
            res.status(400).send({message : "Please add all fields"})

        const user = handleJSON.find(pathToUsers , email)

        if(user && (user.password == password))
            res.status(200).json({...user , token : handleJSON.generateToken(user.id)})
    
        res.status(401).send({message : "Email or password incorrect"})
    } ,

    getUser(req , res) {
        const {id, name , email} = handleJSON.find(req.user.id) 

        res.status(200).json({
            id,
            name,
            email
        })
    }

}