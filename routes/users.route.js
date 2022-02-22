const router = require('express').Router()
const usersController = require('@api/controllers/users')

router.get('/', usersController.helloWorld)

router.get('/users', usersController.getUsers)

router.post('/user', usersController.createUser)

module.exports = router