const router = require('express').Router()
const { check } = require('express-validator');

const validResult = require('helpers/validResult')
const usersController = require('@api/controllers/users')

router.get('/', usersController.helloWorld)

router.get('/user/:id?', check('id').isNumeric(), validResult, usersController.getUser)

router.post('/user', usersController.createUser)

module.exports = router