const { Rental, validateRental } = require('../Models/Rental');
const { Movie } = require('../Models/Movie');
const Customer = require('../Models/Customer');
const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
// const Fawn = require('fawn');

// Fawn.init("mongodb://localhost:27017/Vidly");
router.get('/', async (req, res) => {
    // get all the records from the rentals collection.
    try {
        const result = await Rental.find().sort("-dateOut");
        return res.status(200).send(result);
    }
    catch (exc) {
        return res.status(400).send(exc);
    }

})

router.post('/', async (req, res) => {
    // validate the incoming request.
    const validationResult = validateRental(req.body);
    if (!validationResult) return res.status(400).send("Validation Failed! ");

    // now check if this customer exists in our databse.
    const customer = await Customer.findById(req.body.customerId);

    if (!customer) return res.status(400).send("No such customer exists in our database!");

    // now check whether the movie exists in our database.
    const movie = await Movie.findById(req.body.movieId);

    if (!movie) return res.status(400).send("No such movie exists in our database!");

    // if both movie and customer exist in our database, we create a rental record.
    const newRental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        rentalDuration: req.body.rentalDuration,
        totalRent: req.body.rentalDuration * parseInt(movie.dailyRentalRate)
    })

    if (!newRental) return res.status(500).send("Internal Server Error! Record not inserted.");

    // // we create a Fawn Task 
    // try {
    //     const result = await new Fawn.Task().save('rentals', newRental).update('movies', { _id: movie._id }, { $inc: { numberInStock: - 1 } }).run();
    //     return res.status(200).send(result);
    // } catch (exc) {
    //     console.log(exc);
    //     return res.status(400).send(exc);
    // }



    // save the record in the database.
    // const result = await newRental.save();

    // decrement the movies available in stock.
    // movie.numberInStock-- ;
    try {
        const result = await newRental.save();
        movie.numberInStock--;
        return res.status(200).send(result);
    }
    catch (exc) {
        return res.status(500).send(exc);
    }

})

module.exports = router;