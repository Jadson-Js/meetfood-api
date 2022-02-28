const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('helpers/validResult')
const usersController = require('@api/controllers/users')
const constants = require('utils/constants')

router.get('/', 
    usersController.helloWorld)

router.get('/users', 
    usersController.getUsers)

router.get('/user/:id',
    check('id').isNumeric().withMessage(constants.invalidId),
    validResult,
    usersController.getUser)

router.post('/user', 
    check('email').isEmail().normalizeEmail().withMessage(constants.invalidEmail), 
    check('password').isLength({ min: 8, max: 160 }).withMessage(constants.invalidPassword),
    validResult,
    usersController.createUser)

module.exports = router