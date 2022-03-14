const config = require('@config')
const roleService = require('@services/role')
const {
    logUser,
    logPermission
} = require('@utils/constants')

const authGet = (requiredPermissionId) => {
    return async (req, res, next) => {
        userSession = req.session.userSession

        if (!userSession) {
            res.sendError(logUser.AccessDenied, 403)

        } else {
            const userRoleId = userSession.roleId
            const role = await roleService.getRoleById(userRoleId)

            let authorizedPermission = false

            for (let permission of role.permissions) {
                if (permission.dataValues.id == requiredPermissionId) {
                    authorizedPermission = true
                }
            }

            authorizedPermission ? next() : res.sendError(logPermission.permissionRequired, 403)
        }
    }
}
module.exports = authGet