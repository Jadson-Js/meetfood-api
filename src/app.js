const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const sendError = require('@helpers/sendErrors')

const userRoutes = require('@routes/user')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(sendError)

app.use('/', userRoutes)

module.exports = app