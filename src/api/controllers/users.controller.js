const usersService = require('@api/services/users')
const constants = require('utils/constants')

const usersController = {
    helloWorld(req, res) {
        res.send('Hello world, bitch!')
    },

    async getUser(req, res) {
        const id = req.params.id
        
        try {
            const data = await usersService.getUserById(id)

            if (!data) {
                res.sendError(constants.userNotFound, 404)
            }

            res.status(200).json(data)
        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }
        
    },

    async createUser(req, res) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            let emailAlreadyExist = await usersService.getUserByEmail(newUser.email)

            if (emailAlreadyExist != undefined) {
                res.sendError(constants.emailAlreadyExist, 400)
            } else {
                await usersService.createUser(newUser)

                res.send('User created')
            }
        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }
    }
}

module.exports = usersController