const mongoose = require("mongoose");

module.exports = function () {
    mongoose.connect("mongodb://localhost:27017/Vidly").then(() => console.log("Connected to DB..."));

}