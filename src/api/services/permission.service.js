const {Permission, Role} = require('@models')

const RolesService = {
    async getPermissions () {
        let permissions = await Permission.findAll({ include: {model: Role, as: 'role'} }) 
        
        return permissions
    },

    async getPermissionById(id) {
        let permission = await Permission.findByPk(id) 
        
        return permission
    },

    async getPermissionByName(name) {
        let permission = await Permission.findOne({
            where: {name: name}
        })
        
        return permission
    },

    async createPermission(permission) {
        return await Permission.create({ name: permission.name, description: permission.description });
    },

    async deletePermissionById(id) {
        return await Permission.destroy({
            where: { id: id }
        })
    }
}


module.exports = RolesService