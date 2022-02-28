const userService = require('@services/user')
const constants = require('@utils/constants')

const usersController = {
    helloWorld(req, res) {
        res.send('Hello world, bitch!')
    },

    async getUsers(req, res) {
        try {
            const users = await userService.getUsers()

            res.status(200).json(users)
        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }
    },

    async getUser(req, res) {
        const id = req.params.id

        try {
            const user = await userService.getUserById(id)

            if (!user) {
                res.sendError(constants.userNotFound, 404)
            } else {
                res.status(200).json(user)
            }
        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }

    },

    async createUser(req, res) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        try {
            let emailAlreadyExist = await userService.getUserByEmail(newUser.email)

            if (emailAlreadyExist != undefined) {
                res.sendError(constants.emailAlreadyExist, 400)
            } else {
                const userCreated = await userService.createUser(newUser)

                res.json({
                    User: {
                        id: userCreated.id,
                        email: userCreated.email,
                        status: 'Created'
                    }
                })
            }
        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }
    },

    async deleteUser(req, res) {
        const id = req.params.id

        try {
            let idExists = await userService.getUserById(id)

            if (!idExists) {
                res.sendError(constants.userNotFound, 404)
            } else {
                await userService.deleteUserById(id)

                res.json({
                    User: {
                        id: idExists.id,
                        email: idExists.email,
                        status: 'Deleted'
                    }
                })
            }

        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }
    }
}

module.exports = usersController