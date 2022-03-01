const jwt = require('jsonwebtoken');

const userService = require('@services/user')
const constants = require('@utils/constants')
const config = require('@config')

const userControllers = {
    helloWorld(req, res) {
        res.send('Hello world, bitch!')
    },

    async getUser(req, res) {
        const id = req.params.id

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

    async authUser(req, res) {
        const user = {
            name: req.body.name,
            password: req.body.password
        }

        try {
            const userFound = await userService.getUserByName(user.name)

            if (!userFound) {
                res.sendError(constants.userNotFound, 404)
            } else {

                const validUser = await userService.validData(user.password, userFound.password)
            
                if (!validUser) {
                    res.sendError(constants.invalidCredentials, 403)
                } else {
                    const userId = userFound.id

                    const token = await jwt.sign({ userId }, config.jwt.secret, {
                        expiresIn: 300 // expires in 5min
                    });

                    res.status(200).json({
                        status: 200,
                        auth: true,
                        token: token
                    })
                }
            }
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