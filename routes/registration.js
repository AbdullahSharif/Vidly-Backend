const _ = require('lodash');
const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../Models/User");

router.post("/", async (req, res) => {

    // validate the user object.
    const { error } = validateUser(_.pick(req.body, ["userName", "password", "phone", "email"]));
    if (error) return res.status(400).send(error.details[0].message);

    // check whether the user exists in the database.
    let newUser = await User.findOne({ email: req.body.email });
    if (newUser) return res.status(400).send("User already registered");

    // create a new user.
    newUser = new User(_.pick(req.body, ["userName", "email", "password", "phone"]));

    try {
        await newUser.save();
        return res.status(200).send(_.pick(newUser, ["userName", "email", "phone"]));
    } catch (exc) {
        return res.status(400).send(exc);
    }

})

module.exports = router;