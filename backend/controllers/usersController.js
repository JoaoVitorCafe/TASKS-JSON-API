const path = require('path')
const handleJSON = require('../handleJSON/handleJSON')
const pathToUsers = path.join(__dirname , '../users.json')
const { generateToken} = require('../middleware/authMiddleware')
const bcrypt = require('bcryptjs') 

module.exports = {
    
    // @desc    Register new user
    // @route   POST /api/users/register
    // @acess   Public
    async registerUser(req , res) {

        const {name , email , password} = req.body

        if(!name || !email || !password) {
            return res.status(400).json("Please add all fields")
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const userExists = await handleJSON.findByEmail(pathToUsers , email)
        
        if(userExists) {
            return res.status(400).json("User already exists")
        }
        
        const user = { id : handleJSON.generateID() ,
            name ,
            email ,
            password : hashedPassword,
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
            return res.status(400).json("Please add all fields")
        }

        const user = await handleJSON.findByEmail(pathToUsers , email)

        if(user && (await bcrypt.compare(password , user.password))) {
            res.status(200).json({...user , token : generateToken(user.id)})
        } else {
            res.status(400).json("Email or password incorrect")
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