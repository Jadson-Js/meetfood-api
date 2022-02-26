require('dotenv').config()
require('module-alias/register')


const boot = require('@api/services/boot')
const connection = require('@database/connection')

boot()

connection.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error))