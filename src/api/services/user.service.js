const userModel = require('@models/user')
const logUtils = require('@utils/log')

const usersService = {
    async getUsers () {
        let user = await userModel.findAll() 
        
        return user
    },

    async getUserById(id) {
        let user = await userModel.findByPk(id) 
        
        return user
    },

    async getUserByEmail(email) {
        let user = await userModel.findOne({
            where: {email: email}
        })
        
        return user
    },

    async createUser(user) {
        const hash = logUtils.encrypt(user.password)

        return await userModel.create({ name: user.name, email: user.email, password: hash });
    },

    async deleteUserById(id) {
        await userModel.destroy({
            where: { id: id }
        })
    }
}


module.exports = usersService