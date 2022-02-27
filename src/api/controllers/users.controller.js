const usersService = require('@api/services/users')
const constants = require('utils/constants')

const usersController = {
    helloWorld(req, res) {
        res.sendError('Error no banco de dados :(', 500)
    },

    async getUser(req, res) {
        const userId = req.params.id
        
        try {
            const data = await usersService.getUser(userId)

            if (!data) {
                res.sendError(constants.userNotFound, 404)
            }

            res.status(200).json(data)
        } catch (err) {
            res.sendError(somethingGoesWrong, 500)
        }
    },

    async createUser(req, res) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            await usersService.createUser(newUser)

            res.send('User created')
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

module.exports = usersController