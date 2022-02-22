require('dotenv').config()
require('module-alias/register')

const boot = require('@api/services/boot')

boot()