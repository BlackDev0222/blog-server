// utils
const { DATABASE } = require("../utils");

// consts
const { MESSAGES } = require("../consts");

const databaseSetup = async (next) => {
    try {
        await DATABASE.getConnection();
        console.info(MESSAGES.DATABASE_CONNECTION_SUCCESS);
        next();
    } catch (error) {
        console.log(error);
        console.info(MESSAGES.DATABASE_CONNECTION_FAILURE);
    }
};

module.exports = databaseSetup;
