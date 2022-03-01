const bcrypt = require('bcryptjs')

const userModel = require('@models/user')

const usersService = {
    async getUsers () {
        let user = await userModel.findAll() 
        
        return user
    },

    async getUserById(id) {
        let user = await userModel.findByPk(id) 
        
        return user
    },

    async getUserByName(name) {
        let user = await userModel.findOne({
            where: {name: name}
        })
        
        return user
    },

    async getUserByEmail(email) {
        let user = await userModel.findOne({
            where: {email: email}
        })
        
        return user
    },

    async validData (password, passwordFound) {
        const passwordIsSame = await bcrypt.compare(password, passwordFound)
        
        return passwordIsSame
    },

    async createUser(user) {
        console.log('uip')
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(user.password, salt)
        console.log(hash)

        return await userModel.create({ name: user.name, email: user.email, password: hash });
    },

    async deleteUserById(id) {
        await userModel.destroy({
            where: { id: id }
        })
    }
}


module.exports = usersService