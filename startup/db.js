const mongoose = require("mongoose");
const logger = require('../startup/log');

module.exports = function() {
    mongoose
    .connect("mongodb://Mamad:Mamad@localhost:27017/nodejs?authMechanism=DEFAULT&authSource=admin", { useNewUrlParser: true })
    .then(() => { logger.info("Connected .. ")});
}