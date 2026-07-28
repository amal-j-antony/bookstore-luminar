const jwt = require("jsonwebtoken")

const jwtAuthMiddleware = (req, res, next) => {
    console.log('Inside JWT Auth Middleware');

    const token = req.headers["authorization"].split(' ')[1]
    console.log(token);

    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTkey)
            console.log(jwtResponse);
            if (jwtResponse) {
                req.email = jwtResponse.email
                req.role = jwtResponse.role
                next()
            }
        } catch (error) {
            res.status(401).json('Authorization failed..')
        }
    }
}

module.exports = jwtAuthMiddleware