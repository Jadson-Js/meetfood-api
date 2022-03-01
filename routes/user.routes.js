const router = require('express').Router()
const { check } = require('express-validator');

const verifyToken = require('@middleware/verifyToken')

const validResult = require('@helpers/validResult')
const userControllers = require('@controllers/user')
const constants = require('@utils/constants')

router.post('/login', 
    check('email').isLength({ min: 1, max: 256 }).isEmail().normalizeEmail().withMessage(constants.invalidEmail), 
    check('password').isLength({ min: 8, max: 160 }).withMessage(constants.invalidPassword),
    userControllers.loginUser
)

router.get('/', 
    userControllers.helloWorld
)

router.get('/users', 
    userControllers.getUsers
)

router.get('/user/:id',
    verifyToken,
    check('id').isNumeric().withMessage(constants.invalidId),
    validResult,
    userControllers.getUser
)

router.post('/user', 
    check('name').isLength({ min: 1, max: 32 }).isString().withMessage(constants.invalidName),
    check('email').isLength({ min: 1, max: 256 }).isEmail().normalizeEmail().withMessage(constants.invalidEmail), 
    check('password').isLength({ min: 8, max: 160 }).withMessage(constants.invalidPassword),
    validResult,
    userControllers.createUser
)

router.delete('/user/:id',
    verifyToken,
    check('id').isNumeric().withMessage(constants.invalidId),
    validResult,
    userControllers.deleteUser
)

module.exports = router