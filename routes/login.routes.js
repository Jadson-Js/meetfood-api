const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('@helpers/validResult')
const loginControllers = require('@controllers/login')
const constants = require('@utils/constants')

router.get('/', 
    loginControllers.helloWorld
)

router.get('/session',
    loginControllers.getSession
)

router.post('/login', 
    check('email').isLength({ min: 1, max: 256 }).isEmail().normalizeEmail().withMessage(constants.invalidEmail), 
    check('password').isLength({ min: 8, max: 160 }).withMessage(constants.invalidPassword),
    validResult,
    loginControllers.loginUser
)


module.exports = router