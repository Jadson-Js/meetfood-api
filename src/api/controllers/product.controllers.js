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
    }
}

module.exports = userControllers