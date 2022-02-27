const usersModel = require('@api/models/users')

const usersService = {
    async getUserById(id) {
        let user = await usersModel.findByPk(id) 
        
        return user
    },

    async getUserByEmail(email) {
        let user = await usersModel.findOne({where: {email: email}})
        
        return user
    },

    async createUser(user) {
        await usersModel.create({ email: user.email, password: user.password });
    }
}


module.exports = usersService