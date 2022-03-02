const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('@config')

const loginService = {
    async verifyPassword (password, passwordFound) {
        const passwordIsSame = await bcrypt.compare(password, passwordFound)
        
        return passwordIsSame
    },

    async createToken(id, email) {
        const token = await jwt.sign({ id, email }, config.jwt.secret, {
            expiresIn: 864000 // 24 horas
        });

        return token
    }
}


module.exports = loginService