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
        const findUser = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            let userFound = await userService.getUserByEmail(findUser.email)

            if (!userFound) {
                res.sendError(constants.userNotFound, 404)
                return
            }

            const validUser = await loginService.verifyPassword(findUser.password, userFound.password)

            if (!validUser) {
                res.sendError(constants.invalidCredentials, 403)
            } else {
                const { id, name, email, password, roleId } = userFound

                const token = await loginService.createToken(id, email);

                const data = {
                    id, name, email, password, roleId, token
                }
                
                req.session.loggedUser = data

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