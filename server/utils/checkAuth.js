// node_modules
const jwt = require("jsonwebtoken");

// config
const { JWT_TOKEN } = require("../config");

// config
const { ERRORS } = require("../consts");

// utils
const errorHandler = require("./errorHandler");

const checkAuth = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const user = jwt.verify(token, JWT_TOKEN);

        req.user = user;
        next();
    } catch (error) {
        errorHandler(res, ERRORS.UNAUTHORIZED.code);
    }
};

module.exports = checkAuth;
