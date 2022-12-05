const express = require("express");
const Joi = require("joi");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../Models/User");

const validateLogin = function (obj) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).required()
    });

    return schema.validate(obj);
}

router.post("/", async (req, res) => {
    // validate the request from the user.
    const { error } = validateLogin(_.pick(req.body, ["email", "password"]));
    if (error) return res.status(400).send("Invalid email or password!");

    // check whether the user exists in the database or not.
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("Invalid email or password!");

    // if the user exists in the database, then compare the password in database.
    const passwordValidation = await bcrypt.compare(req.body.password, user.password);

    if (!passwordValidation) return res.status(400).send("Invalid email or password!");

    // if the user exists in the database, we sign a token and return it to the user.
    const token = user.generateAuthToken();
    return res.status(200).header("x-auth-token", token).send(token);


})



module.exports = router;