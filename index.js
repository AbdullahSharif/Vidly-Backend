const config = require("config");
const express = require('express');
const genres = require('./routes/genres');
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require('./routes/rentals');
const registrations = require("./routes/registration");
const auth = require("./routes/auth");
const mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/Vidly").then(() => console.log("Connected to DB...")).catch(() => console.log("Error occured while connecting to DB ..."));
if (!config.get("jwtPrivateKey")) {
    console.error("Jwt token not set in the runtime environment.")
    process.exit(1);
}

const app = express();
app.use(express.json());        // use a middleware to handle json in the request body.
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/registration", registrations);
app.use("/api/auth", auth);






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));






