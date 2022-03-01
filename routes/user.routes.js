const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('@helpers/validResult')
const userControllers = require('@controllers/user')
const constants = require('@utils/constants')

router.get('/', 
    userControllers.helloWorld
)

router.post('/login', 
    check('name').isLength({ min: 1, max: 32 }).isString().withMessage(constants.invalidName),
    check('password').isLength({ min: 8, max: 160 }).withMessage(constants.invalidPassword),
    userControllers.authUser
)

router.get('/users', 
    userControllers.getUsers
)

router.get('/user/:id',
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
    check('id').isNumeric().withMessage(constants.invalidId),
    validResult,
    userControllers.deleteUser
)

module.exports = router