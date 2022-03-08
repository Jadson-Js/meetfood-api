const rolePermissionService = require('@services/role-permission')
const { logDefault, logRole } = require('@utils/constants')

const rolePermissionsControllers = {
    async getRolesPermissions(req, res) {
        
            const rolesPermissions = await rolePermissionService.getRolesPermissions()

            res.status(200).json({
                status: 200,
                data: rolesPermissions
            })
        
    },

    async createRolePermission(req, res) {
        const role = {
            name: req.body.name,
            description: req.body.description
        }

        try {
            const nameAlreadyExist = await rolePermissionService.getRoleByName(role.name)

            if (nameAlreadyExist != undefined) {
                res.sendError(logDefault.nameAlreadyExist, 400)
            } else {
                await rolePermissionService.createRole(role)

                res.status(200).json({
                    status: 200,
                    success: true
                })
            }
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async deleteRolePermission(req, res) {
        const id = req.params.id

        try {
            let idExists = await rolePermissionService.getRoleById(id)

            if (!idExists) {
                res.sendError(logRole.roleNotFound, 404)
            } else {
                await rolePermissionService.deleteRoleById(id)

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

module.exports = rolePermissionsControllers