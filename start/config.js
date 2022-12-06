const config = require("config");
module.exports = function () {
    if (!config.get("jwtPrivateKey")) {
        console.error("Jwt token not set in the runtime environment.")
        process.exit(1);
    }
}
