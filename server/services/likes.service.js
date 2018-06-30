// utils
const { DATABASE } = require("../utils");

const createLike = async (likeData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector.returning("id").insert("likes", likeData);
    } catch (error) {
        throw error;
    }
};

const readLikes = async (likeData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector.select(["id"]).where(likeData).get("likes");
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createLike,
    readLikes,
};
