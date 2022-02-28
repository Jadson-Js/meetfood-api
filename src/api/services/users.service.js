const usersModel = require('@models/users')
const logUtils = require('@utils/log')

const usersService = {
    async getUsers () {
        let user = await usersModel.findAll() 
        
        return user
    },

    async getUserById(id) {
        let user = await usersModel.findByPk(id) 
        
        return user
    },

    async getUserByEmail(email) {
        let user = await usersModel.findOne({
            where: {email: email}
        })
        
        return user
    },

    async createUser(user) {
        const hash = logUtils.encrypt(user.password)

        return await usersModel.create({ email: user.email, password: hash });
    },

    async deleteUserById(id) {
        await usersModel.destroy({
            where: { id: id }
        })
    }
}


module.exports = usersService