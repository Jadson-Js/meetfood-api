const userService = require('@services/user')
const roleService = require('@services/role')
const { logDefault, logUser, logRole } = require('@utils/constants')

const userControllers = {
    async getUsers(req, res) {
        try {
            const users = await userService.getUsers()

            res.status(200).json({
                status: 200,
                data: users
            })
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async getUser(req, res) {
        const id = req.params.userId

        if (req.session.userSession == undefined) {
            res.sendError(logUser.requiredLogged, 401)
            return
        }

        if (req.session.userSession.id != id) {
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
            res.sendError(logDefault.somethingGoesWrong, 500)
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
                res.sendError(logDefault.emailAlreadyExist, 400)
                return 
            } 

            await userService.createUser(user)

            res.status(200).json({
                status: 200,
                success: true
            })
            
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async updateUserRole (req, res) {
        const {userId, newRoleId} = req.body

        try {
            const user = await userService.getUserById(userId)
            if (!user) {
                res.sendError(logUser.userNotFound, 404)
                return
            }

            const role = await roleService.getRoleById(newRoleId)
            if (!role) {
                res.sendError(logRole.roleNotFound, 404)
                return
            }
        
            await userService.updateUserRole(userId, newRoleId)

            res.status(200).json({
                status: 200,
                success: true
            })

        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async deleteUser(req, res) {
        const id = req.params.userId

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
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    }
}

module.exports = userControllers