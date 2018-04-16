// config
const { DEBUG } = require("../config");
const LOGGER = require("./logger");

const Response = (res, status, data, message = "") => {
    if (status === 200) {
        if (DEBUG.RESPONSE) {
            console.log({
                ...data,
                message,
            });
        }
        LOGGER.log({
            ...data,
            message,
        });

        res.status(200).json({
            ...data,
            message,
        });
    } else {
        if (DEBUG.RESPONSE) {
            console.log({
                message,
            });
        }
        LOGGER.log({
            message,
        });

        res.status(status).json({
            message,
        });
    }
};

module.exports = Response;
