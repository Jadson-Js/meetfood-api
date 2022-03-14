const router = require('express').Router()
const { check } = require('express-validator');

const verifyJwt = require('@middlewares/verifyJwt')

const validResult = require('@helpers/validResult')
const userControllers = require('@controllers/user')
const {  logDefault, logRole } = require('@utils/constants')

router.get('/users',
    userControllers.getUsers
)

router.get('/user/:userId',
    verifyJwt,
    check('userId').isNumeric().withMessage(logDefault.invalidId),
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

router.post('/user/product',
    check('title').isString().isLength({ min: 1, max: 32 }).withMessage(logDefault.invalidTitle),
    check('description').isString().isLength({ min: 1, max: 498 }).withMessage(logDefault.invalidDescription), 
    check('price').isNumeric().withMessage(logDefault.invalidPrice),
    validResult,
    userControllers.createUserProduct
)

router.put('/user/role',
    check('userId').isNumeric().withMessage(logDefault.invalidId),
    check('newRoleId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    userControllers.updateUserRole
)

router.put('/user/product/:productId',
    check('productId').isNumeric().withMessage(logDefault.invalidId),
    check('newTitle').isString().isLength({ min: 1, max: 32 }).withMessage(logDefault.invalidTitle),
    check('newDescription').isString().isLength({ min: 1, max: 498 }).withMessage(logDefault.invalidDescription), 
    check('newPrice').isNumeric().withMessage(logDefault.invalidPrice),
    validResult,
    userControllers.updateUserProduct
)

router.delete('/user/:userId',
    check('userId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    userControllers.deleteUser
)

router.delete('/user/product/:productId',
    check('productId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    userControllers.deleteUserProduct
)

module.exports = router