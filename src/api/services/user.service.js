const bcrypt = require('bcryptjs')
const {User, Product} = require('@models')

const usersService = {
    async getUsers () {
        let user = await User.findAll() 
        
        return user
    },

    async getUserById(id) {
        let user = await User.findByPk(id, {
            include: {model: Product, as: 'products'}
        }) 
        
        return user
    },

    async getUserByName(name) {
        let user = await User.findOne({
            where: {name: name}
        })
        
        return user
    },

    async getUserByEmail(email) {
        let user = await User.findOne({
            where: {email: email}
        })
        
        return user
    },

    async createUser(user) {
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(user.password, salt)

        return await User.create({ name: user.name, email: user.email, password: hash});
    },

    async updateUserRole(userId, newRoleId) {
        User.update(
            { RoleId: newRoleId},
            { where: { id: userId } }
        )
    },

    async updateUserProduct(newProduct) {
        Product.update(
            { title: newProduct.title, description: newProduct.description, price: newProduct.price},
            { where: { id: newProduct.productId } }
        )
    },

    async deleteUserById(id) {
        await User.destroy({
            where: { id: id }
        })
    }
}


module.exports = usersService