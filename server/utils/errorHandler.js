// node_modules
const _ = require("lodash");

// utils
const Response = require("./response");
const LOGGER = require("./logger");

// config
const { DEBUG } = require("../config");

// consts
const { ERRORS, MESSAGES } = require("../consts");

const errorHandler = (res, error) => {
    let findError = false;

    _.mapKeys(ERRORS, (errorStatus, errorName) => {
        if (errorStatus.code === error) {
            if (DEBUG.ERROR) {
                console.log("Error occured: ", MESSAGES[errorName]);
            }
            LOGGER.error("Error occured: ", MESSAGES[errorName]);

            Response(res, errorStatus.status, {}, MESSAGES[errorName]);

            findError = true;
        }
    });

    if (!findError) {
        if (DEBUG) {
            console.log(MESSAGES.UNKNOWN_ERROR);
            console.log(error);
        }
        LOGGER.error(MESSAGES.UNKNOWN_ERROR);
        LOGGER.log(error);

        Response(res, 500, {}, MESSAGES.UNKNOWN_ERROR);
    }
};

module.exports = errorHandler;
