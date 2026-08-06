const jwt = require("jsonwebtoken")

const jwtAdminMiddleware = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]

    try {
        const jwtResponse = jwt.verify(token, process.env.JWTkey)
        console.log(jwtResponse);
        
        if(jwtResponse.role == "admin"){
            next()
        }else{
            res.status(401).json("Unauthorized")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = jwtAdminMiddleware