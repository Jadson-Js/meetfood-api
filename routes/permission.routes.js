const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('@helpers/validResult')
const permissionControllers = require('@controllers/permission')
const { logDefault } = require('@utils/constants')

router.get('/permissions', 
    permissionControllers.getPermissions
),

router.get('/permission/:id',
    check('id').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    permissionControllers.getPermission
)

router.post('/permission', 
    check('name').isString().isLength({ min: 1, max: 32 }).withMessage(logDefault.invalidName),
    check('description').isString().isLength({ min: 1, max: 498 }).withMessage(logDefault.invalidDescription), 
    validResult,
    permissionControllers.createPermission
)

router.delete('/permission/:id',
    check('id').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    permissionControllers.deletePermission
)

module.exports = router