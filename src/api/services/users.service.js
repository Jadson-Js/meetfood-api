const usersModel = require('@api/models/users')

const usersService = {
    async getUsers() {
        const users = await usersModel.findAll()
        
        return users
    },

    createUser() {
        usersModel.create({
            email: 'jadson20051965@gmail.com',
            password: 'Powerranger123!'
        })
    }
}


module.exports = usersService