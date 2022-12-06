const winston = require("winston");
module.exports = function (err, req, res, next) {
    // console.log("error occured over here!")
    // log the errors to mongodb
    winston.error(err.message);
    res.status(500).send(err);
}