const logger = require('@api/services/logger')

module.exports = (req, res, next) => {
    res.sendError = function (message, status=500) {
        
        logger.error({
            message,
            status
        })

        return this
            .status(status)
            .send({message})
    }
    next()   
}