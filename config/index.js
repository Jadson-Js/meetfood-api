const dotenv = require('dotenv');

module.exports = {
  app: {
    port: process.env.APP_PORT || 3000
  }
};