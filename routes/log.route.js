const router = require('express').Router()
const LogController = require('@api/controllers/log')

router.get('/', LogController.helloWorld)

module.exports = router