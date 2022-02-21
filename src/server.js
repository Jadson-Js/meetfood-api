require('dotenv').config()
require('module-alias/register')

const app = require('@app')
const config = require('config')

app.listen(config.app.port, (error) => {
    if (error) {
        return console.log('Unespected error')
    } else {
        console.log(`Start in http://localhost:${config.app.port}`)
    }
})