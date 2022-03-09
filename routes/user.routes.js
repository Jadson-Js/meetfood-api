const router = require('express').Router()
const { check } = require('express-validator');

const verifyToken = require('@middlewares/verifyToken')

const validResult = require('@helpers/validResult')
const userControllers = require('@controllers/user')
const {  logDefault, logRole } = require('@utils/constants')

router.get('/users', 
    userControllers.getUsers
)

router.get('/user/:id',
    check('id').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    userControllers.getUser
)

router.post('/user', 
    check('name').isLength({ min: 1, max: 32 }).isString().withMessage(logDefault.invalidName),
    check('email').isLength({ min: 1, max: 256 }).isEmail().normalizeEmail().withMessage(logDefault.invalidEmail), 
    check('password').isLength({ min: 8, max: 160 }).withMessage(logDefault.invalidPassword),
    check('RoleId').isEmpty().withMessage(logRole.notAllowedSetRole),
    validResult,
    userControllers.createUser
)

router.delete('/user/:id',
    check('id').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    userControllers.deleteUser
)

module.exports = router