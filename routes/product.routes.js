const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('@helpers/validResult')
const productControllers = require('@controllers/product')
const { logDefault, logRole } = require('@utils/constants')

router.get('/products', 
    productControllers.getProducts
)

module.exports = router