const dotenv = require('dotenv');

module.exports = {
  app: {
    port: process.env.APP_PORT || 3000
  },
  database: {
    host: process.env.DATABSE_HOST || '127.0.0.1',
    port: process.env.DATABSE_PORT || 3306,
    user: process.env.DATABSE_USER || 'root',
    password: process.env.DATABSE_PASSWORD || 'Powerranger123!',
    database: process.env.DATABSE_DATABASE || 'meetfood',
  }
};