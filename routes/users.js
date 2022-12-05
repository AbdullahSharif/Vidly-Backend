const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../Models/User");
const auth = require('../middlewares/auth');

router.get("/me", auth, async (req, res) => {
    // look below. we are getting the id from the payload present in the jwt.
    const userDetails = await User.findOne({ _id: req.user._id }).select("-password");
    return res.status(200).send(userDetails);
})

router.post("/", async (req, res) => {

    // validate the user object.
    const { error } = validateUser(_.pick(req.body, ["userName", "password", "phone", "email"]));
    if (error) return res.status(400).send(error.details[0].message);

    // check whether the user exists in the database.
    let newUser = await User.findOne({ email: req.body.email });
    if (newUser) return res.status(400).send("User already registered");

    // create a new user.
    newUser = new User(_.pick(req.body, ["userName", "email", "password", "phone"]));
    // generate salt.
    const salt = await bcrypt.genSalt(10);
    // now set the user password to the hased password.
    newUser.password = await bcrypt.hash(newUser.password, salt);


    // now save the user in the database.
    try {
        await newUser.save();
        return res.status(200).header("x-auth-token", newUser.generateAuthToken()).send(_.pick(newUser, ["userName", "email", "phone"]));
    } catch (exc) {
        return res.status(400).send(exc);
    }

})

module.exports = router;