const logger = require('../startup/log');

module.exports = function(err, req, res, next) {
    logger.error(err.message);
    res.status(404).send(err.message);
}