const jwt = require("jsonwebtoken")
const path = require('path')
const handleJSON = require('../handleJSON/handleJSON')
const pathToUsers = path.join(__dirname , '../users.json')

// Generate JSON Web Token
const generateToken = (id) =>  {
    return jwt.sign({ id } , process.env.JWT_SECRET , {
        expiresIn : '30d'
    })
}

const protect = async (req , res , next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            // Get user from the token
            const user = await handleJSON.findByID(pathToUsers , decoded.id)
            
            delete user.password
            
            req.user = user

            next()
        } catch(error){
            console.log(error)
            res.status(401).json('Not authorized')
        }
    }

    if(!token) {
        res.status(401).json('Not authorized , no token')
    }

}

module.exports = {protect , generateToken}