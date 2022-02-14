const jwt = require("jsonwebtoken")
const path = require('path')
const handleJSON = require('../handleJSON/handleJSON')
const pathToUsers = path.join(__dirname , '../users.json')

const generateToken = (id) =>  {
    return jwt.sign({ id } , process.env.JWT_SECRET , {
        expiresIn : '30d'
    })
}

const protect = (req , res , next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            const user = handleJSON.findByID(pathToUsers , decoded.id)
            
            delete user.password
            
            req.user = user

            next()
        } catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized , no token')
    }

}

module.exports = {protect , generateToken}