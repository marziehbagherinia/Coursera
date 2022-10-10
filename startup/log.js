const { createLogger, transports } = require('winston');
require('winston-mongodb');

module.exports = createLogger({
    transports: [
      new transports.Console({handleExceptions: true}),
      new transports.File({ filename: './logFiles/combined.log' }),
      new transports.MongoDB({ db: "mongodb://Mamad:Mamad@localhost:27017/nodejs?authMechanism=DEFAULT&authSource=admin" })
    ],
    exceptionHandlers: [
      new transports.File({ filename: './logFiles/exceptions.log' })
    ],
    rejectionHandlers: [
      new transports.File({ filename: './logFiles/rejections.log' })
    ]
});