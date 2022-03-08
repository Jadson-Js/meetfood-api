const {Role, Permission, User} = require('@models')

const RolesService = {
    async getRoles () {
        let role = await Role.findAll() 
        
        return role
    },

    async getRoleById(id) {
        let role = await Role.findByPk(id, {
            include: [{model: User, as: 'users'}, {model: Permission, as: 'permissions'}]
        }) 
        
        return role
    },

    async getRoleByName(name) {
        let role = await Role.findOne({
            where: {name: name}
        })
        
        return role
    },

    async getRoleByEmail(email) {
        let role = await Role.findOne({
            where: {email: email}
        })
        
        return role
    },

    async createRole(role) {
        return await Role.create({ name: role.name, description: role.description });
    },

    async deleteRoleById(id) {
        return await Role.destroy({
            where: { id: id }
        })
    }
}


module.exports = RolesService