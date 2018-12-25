const { JWT_TOKEN, EXPIRATION_TIME } = require("./jwt_token");

const DATABASE_CONFIG = require("./database");

const PORT = 8080;
const UPLOAD_URL = "uploads";

const DEBUG = {
    REQUEST_SHOW: true,
    URL: true,
    TOKEN: true,
    PARAMS: true,
    QUERY: true,
    BODY: true,
    SQL: true,
    RESPONSE: false,
    ERROR: true,
};

const ROUTE_VERSION = "v1";

module.exports = {
    DATABASE_CONFIG,
    JWT_TOKEN,
    EXPIRATION_TIME,
    PORT,
    DEBUG,
    UPLOAD_URL,
    ROUTE_VERSION,
};
