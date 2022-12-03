const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../Models/User");

router.post("/", async (req, res) => {

    // validate the user object.
    const validationResult = validateUser(req.body);
    if (!validationResult) return res.status(400).send("Validation failed!");

    // create a new user.
    const newUser = new User(req.body);

    try {
        const result = await newUser.save();
        return res.status(200).send(result);
    } catch (exc) {
        return res.status(400).send(exc);
    }

})

module.exports = router;