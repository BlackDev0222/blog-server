// config
const { DEBUG } = require("../config");

// utils
const LOGGER = require("./logger");

const routeMiddleware = (req, res, next) => {
    if (DEBUG.REQUEST_SHOW) {
        console.group("/----------------New Request---------------/");
        if (DEBUG.URL) {
            console.log(
                "URL:",
                req.protocol + "://" + req.get("host") + req.url
            );
        }
        if (DEBUG.PARAMS) {
            console.log("PARAMS:", req.params);
        }
        if (DEBUG.QUERY) {
            console.log("QUERY:", req.query);
        }
        if (DEBUG.BODY) {
            console.log("BODY:", req.body);
        }
        console.groupEnd("/---------------That's all----------------/");
    }

    LOGGER.info("URL:", req.protocol + "://" + req.get("host") + req.url);
    LOGGER.info("PARAMS:", req.params);
    LOGGER.info("QUERY:", req.query);
    LOGGER.info("BODY:", req.body);

    next();
};

module.exports = routeMiddleware;
