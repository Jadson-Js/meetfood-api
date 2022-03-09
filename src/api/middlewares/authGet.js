const config = require('@config')
const roleService = require('@services/role')
const { logUser, logPermission } = require('@utils/constants')

async function authGet (req, res, next) {
    loggedUser = req.session.loggedUser

    if (!loggedUser) {
        res.sendError(logUser.AccessDenied, 403)

    } else {
        const userRoleId = loggedUser.RoleId
        const role = await roleService.getRoleById(userRoleId)
        let authorizedPermission = false
        
        for (let permission of role.permissions) {
          if(permission.dataValues.id == config.permissions.get) {
            authorizedPermission = true
          }
        } 

        authorizedPermission ? next() : res.sendError(logPermission.getPermissionRequired, 403)
    }
}

module.exports = authGet