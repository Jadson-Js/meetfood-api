const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('@helpers/validResult')
const usersController = require('@controllers/user')
const constants = require('@utils/constants')

router.get('/', 
    usersController.helloWorld
)

router.get('/users', 
    usersController.getUsers
)

router.get('/user/:id',
    check('id').isNumeric().withMessage(constants.invalidId),
    validResult,
    usersController.getUser
)

router.post('/user', 
    check('name').isLength({ min: 1, max: 32 }).isString().withMessage(constants.invalidName),
    check('email').isLength({ min: 1, max: 256 }).isEmail().normalizeEmail().withMessage(constants.invalidEmail), 
    check('password').isLength({ min: 8, max: 160 }).withMessage(constants.invalidPassword),
    validResult,
    usersController.createUser
)

router.delete('/user/:id',
    check('id').isNumeric().withMessage(constants.invalidId),
    validResult,
    usersController.deleteUser
)

module.exports = router