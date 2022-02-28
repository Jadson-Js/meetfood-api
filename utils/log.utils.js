const bcrypt = require('bcryptjs')
const saltRounds = 10

const log = {
    encrypt (password) {
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)

        return hash
    }
}

module.exports = log