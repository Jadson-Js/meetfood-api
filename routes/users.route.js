const router = require('express').Router()
const { body } = require('express-validator');
const usersController = require('@api/controllers/users')

router.get('/', usersController.helloWorld)

router.get('/user/:id?', body('id').isNumeric(), usersController.getUser)

router.post('/user', usersController.createUser)

module.exports = router