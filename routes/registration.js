const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../Models/User");

router.post("/", async (req, res) => {

    // validate the user object.
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check whether the user exists in the database.
    let newUser = await User.findOne({ email: req.body.email });
    if (newUser) return res.status(400).send("User already registered");

    // create a new user.
    newUser = new User(req.body);

    try {
        const result = await newUser.save();
        return res.status(200).send(result);
    } catch (exc) {
        return res.status(400).send(exc);
    }

})

module.exports = router;