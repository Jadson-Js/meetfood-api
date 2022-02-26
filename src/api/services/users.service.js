const usersModel = require('@api/models/users')

const usersService = {
    async getUser(userId) {
        let data 
        
        if(userId) {
            data = await usersModel.findByPk(userId)
        } else {
            data = await usersModel.findAll()
        }

        return data
    },

    async createUser(user) {
        await usersModel.create({ email: user.email, password: user.password });
    }
}


module.exports = usersService