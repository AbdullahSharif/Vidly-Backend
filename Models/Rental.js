const Joi = require('joi');
const objectId = require("joi-objectid")(Joi);
const mongoose = require('mongoose');

const rentalsSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema({
            name: {
                type: String,
                minlength: 3,
                maxlength: 50
            },
            phone: {
                type: String,
                minlength: 11,
                maxlength: 11
            }
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
            },
            dailyRentalRate: {
                type: Number
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now
    },
    totalRent: {
        type: Number,
    },
    rentalDuration: {
        type: Number,
        required: true
    }


})

const Rental = mongoose.model("rental", rentalsSchema);

function validateRental(obj) {
    const schema = Joi.object({
        customerId: objectId().required(),
        movieId: objectId().required(),
        rentalDuration: Joi.number().required()
    })
    const { error } = schema.validate(obj);
    if (error) return false;

    return true;

}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;

