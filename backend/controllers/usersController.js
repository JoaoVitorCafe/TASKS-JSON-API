const path = require('path')
const fs = require('fs')
const handleJSON = require('../handleJSON/handleJSON')
const pathToUsers = path.join(__dirname , '../users.json')
const { generateToken} = require('../middleware/authMiddleware') 

module.exports = {
    
    // @desc    Register new user
    // @route   POST /api/users/register
    // @acess   Public
    registerUser(req , res) {
        handleJSON.check(pathToUsers)

        const {name , email , password} = req.body

        if(!name || !email || !password) {
            res.status(400)
            throw new Error("Please add all fields")
        }

        const userExists = handleJSON.findByEmail(pathToUsers , email)

        if(userExists) {
            res.status(400)
            throw new Error("User already exists")
        }
        
        const user = { id : handleJSON.generateID() ,
            name ,
            email ,
            password,
        }
   
        const users = handleJSON.get(pathToUsers)
        users.push(user)

        fs.writeFileSync(pathToUsers , JSON.stringify(users) , 'utf-8')
        res.status(201).json({...user , token : generateToken(user.id)})
    } ,

    // @desc    Authenticate a user
    // @route   POST /api/users/login
    // @acess   Public
    loginUser(req , res) {
        handleJSON.check(pathToUsers)

        const { email , password} = req.body

        if(!email || !password) {
            res.status(400)
            throw new Error("Please add all fields")
        }

        const user = handleJSON.findByEmail(pathToUsers , email)
        // put the generateToken inside another file , i really thing it's better
        if(user && (user.password == password)) {
            res.status(200).json({...user , token : generateToken(user.id)})
        } else {
            res.status(400)
            throw new Error("Email or password incorrect")
        }     
    } ,

    // @desc    Get data from the authenticated user
    // @route   GET /api/users/user
    // @acess   Public
    getUser(req , res) {  
        const {id, name , email} = handleJSON.findByID(pathToUsers ,req.user.id) 

        res.status(200).json({
            id,
            name,
            email
        })
    }

}