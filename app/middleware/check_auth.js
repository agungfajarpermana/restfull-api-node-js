const jwt = require("jsonwebtoken")

// .env file
require("dotenv/config")

module.exports = (req, res, next) => {
    const token = req.headers.authorization 
                  ? req.headers.authorization.split(" ")[1] 
                  : null
    jwt.verify(token, process.env.JWT_Secret, (err, decoded) => {
        if(err)
            return next(new Error("Token must be required"))
        
        req.userData = decoded
        next()
    })
}