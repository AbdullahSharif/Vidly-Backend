require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
    winston.add(new winston.transports.MongoDB({
        db: "mongodb://localhost/Vidly"
    }));
    // to catch an uncaught exceotion, the exception outside of the express cycle, 
    process.on("uncaughtException", (exc) => {
        // now we can use winsotn to log this exception to the mongodb database.
        winston.error(exc.message, exc);
    });

    // to handle uncaught rejected promises.
    process.on("unhandledRejection", (exc) => {
        winston.error(exc.message, exc);
    })
}