const userService = require('@services/user')
const { logUser } = require('@utils/constants')

const userControllers = {
    async getUser(req, res) {
        const id = req.params.id

        if (req.session.loggedUser == undefined) {
            res.sendError(logUser.requiredLogged, 401)
            return
        }

        if (id != req.session.loggedUser.id) {
            res.sendError(logUser.AccessDenied, 403)
            return
        }

        try {
            const user = await userService.getUserById(id)

            if (!user) {
                res.sendError(logUser.userNotFound, 404)
            } else {
                res.status(200).json({
                    status: 200,
                    data: user
                })
            }
        } catch (err) {
            res.sendError(logUser.somethingGoesWrong, 500)
        }

    },

    async getUsers(req, res) {
        try {
            const users = await userService.getUsers()

            res.status(200).json({
                status: 200,
                data: users
            })
        } catch (err) {
            res.sendError(logUser.somethingGoesWrong, 500)
        }
    },

    async createUser(req, res) {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        try {
            const emailAlreadyExist = await userService.getUserByEmail(user.email)

            if (emailAlreadyExist != undefined) {
                res.sendError(logUser.emailAlreadyExist, 400)
            } else {
                await userService.createUser(user)

                res.status(200).json({
                    status: 200,
                    success: true
                })
            }
        } catch (err) {
            res.sendError(logUser.somethingGoesWrong, 500)
        }
    },

    async deleteUser(req, res) {
        const id = req.params.id

        try {
            let idExists = await userService.getUserById(id)

            if (!idExists) {
                res.sendError(logUser.userNotFound, 404)
            } else {
                await userService.deleteUserById(id)

                res.status(200).json({
                    status: 200,
                    success: true
                })
            }

        } catch (err) {
            res.sendError(logUser.somethingGoesWrong, 500)
        }
    }
}

module.exports = userControllers