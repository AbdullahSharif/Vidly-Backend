const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 70
    },
    password: {
        type: String,
        required: true,
        minlenght: 8
    },
    phone: {
        type: String,
        required: true,
        minlenght: 11,
        maxlenght: 11
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
})

const User = new mongoose.model("user", userSchema);


function validateUser(obj) {
    const schema = Joi.object({
        userName: Joi.string().required().min(3).max(70),
        password: Joi.string().required().min(8),
        phone: Joi.string().required().min(11).max(11),
        email: Joi.string().email().required()
    });
    const { error } = schema.validate(obj)

    if (error) return false;

    return true;

}

module.exports.User = User;
module.exports.validateUser = validateUser;