const {Product} = require('@models')

const productService = {
    async getProducts () {
        let products = await Product.findAll() 
        
        return products
    },

    async getProductById(id) {
        let product = await Product.findByPk(id) 
        
        return product
    },

    async getProductByTitle(title) {
        let product = await Product.findOne({
            where: {title: title}
        })
        
        return product
    },

    async createUserProduct(product) {
        console.log(product)
        return await Product.create({ 
            title: product.title, 
            description: product.description, 
            UserId: product.userId,
            price: product.price
        });
    },

    async deleteUserProductById(id) {
        return await Product.destroy({
            where: { id: id }
        })
    }
}


module.exports = productService