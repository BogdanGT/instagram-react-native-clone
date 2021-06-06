const jwt = require("jsonwebtoken")
module.exports = (req,res,next) => {
    const token = req.header("x-auth-token")
    console.log(token)
    const decode = jwt.verify(token, "MYSECRETKEY")
    
    req.user = decode.user

    next()
}