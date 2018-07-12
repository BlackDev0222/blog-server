// utils
const { DATABASE } = require("../utils");

const createComment = async (commentData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .returning("id")
            .insert("comments", commentData);
    } catch (error) {
        throw error;
    }
};

const readComments = async (commentData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select(["blogs.id"])
            .join("blogs", "comments.commentBlogId = blogs.id", "right")
            .where({
                "comments.mainBlogId": commentData.mainBlogId,
                "blogs.userId": commentData.userId,
            })
            .get("comments");
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createComment,
    readComments,
};
