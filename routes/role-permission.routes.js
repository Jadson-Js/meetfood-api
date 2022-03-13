const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('@helpers/validResult')
const rolePermissionControllers = require('@controllers/role-permission')
const { logDefault, logRole } = require('@utils/constants')

router.get('/roles-permissions', 
    rolePermissionControllers.getRelationships
)

router.get('/role-permission/:id',
    check('id').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    rolePermissionControllers.getRelationship
)

router.post('/role-permission', 
    check('RoleId').isNumeric().withMessage(logDefault.invalidId),
    check('PermissionId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    rolePermissionControllers.createRolePermission
)

router.delete('/role-permission/:id',
    check('id').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    rolePermissionControllers.deleteRolePermission
)

module.exports = router