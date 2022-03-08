const path = require('path')
const handleJSON = require('../handleJSON/handleJSON')
const pathToUsers = path.join(__dirname , '../users.json')
const { generateToken} = require('../middleware/authMiddleware') 

module.exports = {
    
    // @desc    Register new user
    // @route   POST /api/users/register
    // @acess   Public
    async registerUser(req , res) {

        const {name , email , password} = req.body

        if(!name || !email || !password) {
            res.status(400)
            throw new Error("Please add all fields")
        }

        const userExists = await handleJSON.findByEmail(pathToUsers , email)
        
        if(userExists) {
            res.status(400)
            throw new Error("User already exists")
        }
        
        const user = { id : handleJSON.generateID() ,
            name ,
            email ,
            password,
        }

       await handleJSON.createData(pathToUsers , user)
        
        res.status(201).json({...user , token : generateToken(user.id)})
    } ,

    // @desc    Authenticate a user
    // @route   POST /api/users/login
    // @acess   Public
    async loginUser(req , res) {

        const { email , password} = req.body

        if(!email || !password) {
            res.status(400)
            throw new Error("Please add all fields")
        }

        const user = await handleJSON.findByEmail(pathToUsers , email)

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
    async getUser(req , res) {  
        const {id, name , email} = await handleJSON.findByID(pathToUsers ,req.user.id) 

        res.status(200).json({
            id,
            name,
            email
        })
    }

}