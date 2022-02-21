const express = require('express')
const logRoutes = require('routes/log')

const app = express()

app.use('/', logRoutes)

module.exports = app