const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('@helpers/validResult')

const verifyJwt = require('@middlewares/verifyJwt')
const authGet = require('@auth/authGet')

const loginControllers = require('@controllers/login')

const { logDefault } = require('@utils/constants')

router.get('/',
    verifyJwt,
    authGet,
    loginControllers.helloWorld
)

router.get('/session',
    loginControllers.getSession
)

router.post('/login', 
    check('email').isLength({ min: 1, max: 256 }).isEmail().normalizeEmail().withMessage(logDefault.invalidEmail), 
    check('password').isLength({ min: 8, max: 160 }).withMessage(logDefault.invalidPassword),
    validResult,
    loginControllers.loginUser
)


module.exports = router