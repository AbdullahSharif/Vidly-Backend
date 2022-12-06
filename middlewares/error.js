module.exports = function (err, req, res, next) {
    // console.log("error occured over here!")
    res.status(500).send(err);
}