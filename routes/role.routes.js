const router = require('express').Router()
const { check } = require('express-validator');

const verifyToken = require('@middlewares/verifyToken')

const validResult = require('@helpers/validResult')
const roleControllers = require('@controllers/role')
const { logDefault, logRole } = require('@utils/constants')

router.get('/roles', 
    roleControllers.getRoles
)

router.get('/role/:id',
    check('id').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    roleControllers.getRole
)

router.post('/role', 
    check('name').isString().isLength({ min: 1, max: 32 }).withMessage(logDefault.invalidName),
    check('description').isString().isLength({ min: 1, max: 498 }).withMessage(logDefault.invalidDescription), 
    validResult,
    roleControllers.createRole
)

router.delete('/role/:id',
    check('id').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    roleControllers.deleteRole
)

module.exports = router