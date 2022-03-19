const userService = require('@services/user')
const productService = require('@services/product')
const { logDefault, logUser, logRole } = require('@utils/constants')

const userControllers = {
    async getProducts(req, res) {
        try {
            const products = await productService.getProducts()

            res.status(200).json({
                status: 200,
                data: products
            })
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async getProductById(req, res) {
        const id = req.params.productId

        try {
            const product = await productService.getProductById(id)

            if (!product) {
                res.sendError(logProduct.productNotFound, 404)
            } else {
                res.status(200).json({
                    status: 200,
                    data: product
                })
            }
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async createUserProduct(req, res) {
        const product = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            userId: req.body.userId
        }

        try {
            const user = await userService.getUserById(product.userId)
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

    async updateUserProduct (req, res) {
        const newProduct = {
            productId: req.params.productId,
            title: req.body.newTitle,
            description: req.body.newDescription,
            price: req.body.newPrice,
        }

        try {
            await productService.updateUserProduct(newProduct)

            res.status(200).json({
                status: 200,
                success: true
            })

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