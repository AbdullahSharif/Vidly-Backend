module.exports = function asyncMiddleware(handler) {
    return (req, res, next) => {
        try {
            handler(req, res);
        } catch (exc) {
            next(exc);
        }
    }
}