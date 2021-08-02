const jwt = require("jsonwebtoken")
const 
    Users
 = require("../models/user")

module.exports = (req, res, next) => {
    console.log(req.headers)
    const {
        authorization
    } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            message: "you must be logged in"
        })
    }
    const token = authorization.replace("Bearer ", "")
    console.log(token," Token")
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, payload) => {
        if (err) {
            console.log(err)
            return res.status(401).json({
                message: "you must be logged in"
            })
        }
        const {
            _id
        } = payload
        Users.find({_id})
            .then(userData => {
                req.user = userData[0];
                next()
            })
            .catch(err => {
                console.log(err)
            })
    })
}