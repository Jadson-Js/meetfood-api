const jwt = require('jsonwebtoken')
const config = require('@config')
const constants = require('@utils/constants')

function verifyJwt (req, res, next) {
    const token = req.headers['authorization']

    if (token != undefined){
    
        jwt.verify(token, config.jwt.secret, (err, data) => {
            if (err) {
                res.sendError(constants.tokenUnauthentic, 401)
            } else {
                req.token = token
                req.loggedUser = data.userId

                next()
            }
        })

        
    } else {
        res.sendError(constants.tokenNotProvide, 400)
    }
}

module.exports = verifyJwt