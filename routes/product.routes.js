const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('@helpers/validResult')
const productControllers = require('@controllers/product')
const { logDefault, logRole } = require('@utils/constants')

router.get('/products', 
    productControllers.getProducts
)

router.get('/product/:productId', 
    productControllers.getProductById
)

router.post('/user/product',
    check('userId').isNumeric().withMessage(logDefault.invalidId),
    check('title').isString().isLength({ min: 1, max: 32 }).withMessage(logDefault.invalidTitle),
    check('description').isString().isLength({ min: 1, max: 498 }).withMessage(logDefault.invalidDescription), 
    check('price').isNumeric().withMessage(logDefault.invalidPrice),
    validResult,
    productControllers.createUserProduct
)

router.put('/product/:productId',
    check('productId').isNumeric().withMessage(logDefault.invalidId),
    check('newTitle').isString().isLength({ min: 1, max: 32 }).withMessage(logDefault.invalidTitle),
    check('newDescription').isString().isLength({ min: 1, max: 498 }).withMessage(logDefault.invalidDescription), 
    check('newPrice').isNumeric().withMessage(logDefault.invalidPrice),
    validResult,
    productControllers.updateUserProduct
)

router.delete('/product/:productId',
    check('productId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    productControllers.deleteUserProduct
)

module.exports = router