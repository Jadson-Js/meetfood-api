const jwt = require('jsonwebtoken')
const config = require('@config')
const constants = require('@utils/constants')

function verifyJwt(req, res, next) {
    const token = req.headers['authorization']

    if (token == undefined) {
        res.sendError(constants.tokenNotProvide, 400)
        return
    } 

    jwt.verify(token, config.jwt.secret, (err, data) => {
        if (err) {
            res.sendError(constants.tokenUnauthentic, 401)
        } else {
            req.token = token
            req.loggedUser = data

            next()
        }
    })



}

module.exports = verifyJwt