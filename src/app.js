const express = require('express')
const usersRoute = require('routes/users')

const app = express()

app.use('/', usersRoute)

module.exports = app