const userService = require('@services/user')
const productService = require('@services/product')
const roleService = require('@services/role')
const { logDefault, logUser, logProduct, logRole } = require('@utils/constants')

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
            const nameAlreadyExist = await userService.getUserByName(user.name)
            if (nameAlreadyExist != undefined) {
                res.sendError(logDefault.nameAlreadyExist, 400)
                return 
            }

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

    async createUserProduct(req, res) {
        if (req.session.userSession == undefined) {
            res.sendError(logUser.requiredLogged, 401)
            return
        }

        const product = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            userId: req.session.userSession.id,
        }

        try {
            const user = await userService.getUserById(id)
            if (!user) {
                res.sendError(logUser.userNotFound, 404)
            }

            await productService.createUserProduct(product)

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

    async updateUserProduct (req, res) {
        if (req.session.userSession == undefined) {
            res.sendError(logUser.requiredLogged, 401)
            return
        }
        
        const newProduct = {
            productId: req.params.productId,
            title: req.body.newTitle,
            description: req.body.newDescription,
            price: req.body.newPrice,
            userId: req.session.userSession.id,
        }

        // try {
            const user = await userService.getUserById(newProduct.userId)
            if (!user) {
                res.sendError(logUser.userNotFound, 404)
                return
            }

            await userService.updateUserProduct(newProduct)

            res.status(200).json({
                status: 200,
                success: true
            })

        // } catch (err) {
        //     res.sendError(logDefault.somethingGoesWrong, 500)
        // }
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
    },

    async deleteUserProduct(req, res) {
        const id = req.params.productId

        try {
            let idExists = await productService.getProductById(id)
            if (!idExists) {
                res.sendError(logProduct.productNotFound, 404)

            } else {
                await productService.deleteUserProductById(id)

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