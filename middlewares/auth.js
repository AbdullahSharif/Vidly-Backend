const jwt = require('jsonwebtoken');
const config = require("config");

module.exports = function (req, res, next) {
    const authToken = req.header("x-auth-token");
    if (!authToken) return res.status(401).send("Token not provided!");

    try {
        const decodedPayload = jwt.verify(authToken, config.get("jwtPrivateKey"));
        // req.body._id = decodedPayload._id;
        // req.body = decodedPayload;
        next();
    } catch (exc) {
        res.send(401).send("Token not valid!");
    }

}