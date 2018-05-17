const path = require("path");
const LOGGER = require("logger").createLogger(
    path.join(__dirname, "../logs/development.log")
);

module.exports = LOGGER;
