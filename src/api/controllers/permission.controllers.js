const permissionService = require('@services/permission')
const { logDefault, logPermission } = require('@utils/constants')

const permissionControllers = {
    async getPermissions(req, res) {
        try {
            const permissions = await permissionService.getPermissions()

            res.status(200).json({
                status: 200,
                data: permissions
            })
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async createPermission(req, res) {
        const permission = {
            name: req.body.name,
            description: req.body.description
        }

        try {
            const nameAlreadyExist = await permissionService.getPermissionByName(permission.name)

            if (nameAlreadyExist != undefined) {
                res.sendError(logDefault.nameAlreadyExist, 400)
            } else {
                await permissionService.createPermission(permission)

                res.status(200).json({
                    status: 200,
                    success: true
                })
            }
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async deletePermission(req, res) {
        const id = req.params.id

        try {
            let idExists = await permissionService.getPermissionById(id)

            if (!idExists) {
                res.sendError(logPermission.permissionNotFound, 404)
            } else {
                await permissionService.deletePermissionById(id)

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

module.exports = permissionControllers