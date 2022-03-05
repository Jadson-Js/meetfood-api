const router = require('express').Router()
const { check } = require('express-validator');

const verifyToken = require('@middleware/verifyToken')

const validResult = require('@helpers/validResult')
const userControllers = require('@controllers/user')
const { logUser, logRole } = require('@utils/constants')

router.get('/users', 
    userControllers.getUsers
)

router.get('/user/:id',
    verifyToken,
    check('id').isNumeric().withMessage(logUser.invalidId),
    validResult,
    userControllers.getUser
)

router.post('/user', 
    check('name').isLength({ min: 1, max: 32 }).isString().withMessage(logUser.invalidName),
    check('email').isLength({ min: 1, max: 256 }).isEmail().normalizeEmail().withMessage(logUser.invalidEmail), 
    check('password').isLength({ min: 8, max: 160 }).withMessage(logUser.invalidPassword),
    validResult,
    userControllers.createUser
)

router.delete('/user/:id',
    verifyToken,
    check('id').isNumeric().withMessage(logUser.invalidId),
    validResult,
    userControllers.deleteUser
)

module.exports = router