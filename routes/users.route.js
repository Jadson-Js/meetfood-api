const router = require('express').Router()
const usersController = require('@api/controllers/users')

router.get('/', usersController.helloWorld)

router.get('/user/:id?', usersController.getUser) 

router.post('/user', usersController.createUser) 

module.exports = router