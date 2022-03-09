const userService = require('@services/user')
const loginService = require('@services/login')
const constants = require('@utils/constants')

const loginControllers = {
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
                return
            }

            const validUser = await loginService.verifyPassword(user.password, userFound.password)

            if (!validUser) {
                res.sendError(constants.invalidCredentials, 403)
            } else {
                const { id, email } = userFound

                const token = await loginService.createToken(id, email)

                req.session.loggedUser = userFound
                req.session.token = token
                res.status(200).json({
                    status: 200,
                    auth: true,
                    token: token
                })
            }

        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }
    }
}

module.exports = loginControllers