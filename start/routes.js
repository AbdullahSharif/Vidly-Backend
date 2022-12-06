const genres = require('../routes/genres');
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require('../routes/rentals');
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middlewares/error");
const express = require("express");

module.exports = function (app) {
    app.use(express.json());        // use a middleware to handle json in the request body.
    app.use("/api/genres", genres);
    app.use("/api/customers", customers);
    app.use("/api/movies", movies);
    app.use("/api/rentals", rentals);
    app.use("/api/users", users);
    app.use("/api/auth", auth);

    // use the error handling error middleware at last.
    app.use(error);
}