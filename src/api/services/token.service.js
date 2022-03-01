const jwt = require('jsonwebtoken');
const config = require('@config')

const tokenService = {
    async createToken(id, email) {
        const token = await jwt.sign({ id, email }, config.jwt.secret, {
            expiresIn: 864000 // 24 horas
        });

        return token
    }
}

module.exports = tokenService