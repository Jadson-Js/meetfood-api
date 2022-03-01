const userService = require('@services/user')
const tokenService = require('@services/token')
const constants = require('@utils/constants')

const userControllers = {
    helloWorld(req, res) {
        res.send('Hello world, bitch!')
    },

    async getSession(req, res) {
        res.status(200).json({
            status: 200,
            data: req.session
        })
    },

    async loginUser(req, res) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            const userFound = await userService.getUserByEmail(user.email)

            if (!userFound) {
                res.sendError(constants.userNotFound, 404)
            } else {

                const validUser = await userService.verifyPassword(user.password, userFound.password)

                if (!validUser) {
                    res.sendError(constants.invalidCredentials, 403)
                } else {
                    const {id, email} = userFound

                    const token = await tokenService.createToken(id, email)

                    req.session.loggedUser = userFound
                    req.session.token = token
                    
                    res.status(200).json({
                        status: 200,
                        auth: true,
                        user: userFound,
                        token: token
                    })
                }
            }
        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }
    },

    async getUser(req, res) {
        const id = req.params.id

        if (id != req.session.loggedUser.id) {
            res.sendError(constants.AccessDenied, 403)
            return
        }

        try {
            const user = await userService.getUserById(id)

            if (!user) {
                res.sendError(constants.userNotFound, 404)
            } else {
                res.status(200).json({
                    status: 200,
                    data: user
                })
            }
        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
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
            res.sendError(constants.somethingGoesWrong, 500)
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
                res.sendError(constants.emailAlreadyExist, 400)
            } else {
                await userService.createUser(user)

                res.status(200).json({
                    status: 200,
                    success: true
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

                res.status(200).json({
                    status: 200,
                    success: true
                })
            }

        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }
    }
}

module.exports = userControllers