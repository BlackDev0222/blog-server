// utils
const { Response } = require("../utils");

// services
const { blogsService, likesService, commentsService } = require("../services");

// utils
const { errorHandler } = require("../utils");

// config
const { ERRORS, MESSAGES } = require("../consts");

const createBlog = async (req, res, next) => {
    try {
        const { title, text, imageUrl, ...rest } = req.body;

        await blogsService.createBlog({
            userId: req.user.id,
            title,
            text,
            imageUrl,
        });

        Response(res, 200, {}, MESSAGES.NEW_BLOG_CREATE_SUCCESS);
    } catch (error) {
        errorHandler(res, error);
    }
};

const createComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, text, imageUrl } = req.body;

        const [blog] = await blogsService.readBlogs(id);

        if (blog) {
            if (blog.userId !== req.user.id) {
                const comments = await commentsService.readComments({
                    mainBlogId: id,
                    userId: req.user.id,
                });

                if (!comments.length) {
                    const newBlogData = await blogsService.createBlog({
                        userId: req.user.id,
                        title,
                        text,
                        imageUrl,
                    });

                    await commentsService.createComment({
                        mainBlogId: id,
                        commentBlogId: newBlogData.insert_id,
                    });
                    Response(res, 200, {}, MESSAGES.COMMENT_CREATE_SUCCESS);
                } else {
                    errorHandler(res, ERRORS.COMMENT_AGAIN_FORBIDDEN.code);
                }
            } else {
                errorHandler(res, ERRORS.COMMENT_MYSELF.code);
            }
        } else {
            errorHandler(res, ERRORS.BLOG_NOT_EXIST.code);
        }
    } catch (error) {
        errorHandler(res, error);
    }
};

const readBlogs = async (req, res, next) => {
    try {
        const pageIndex = req.query.pageIndex ? Number(req.query.pageIndex) : 1;
        const itemCount = req.query.itemCount ? Number(req.query.itemCount) : 5;
        const title = req.query.title ? Number(req.query.title) : "";

        const [blogsCount] = await blogsService.readMainBlogsCount(title);
        const blogs = await blogsService.readMainBlogs(
            pageIndex,
            itemCount,
            title
        );

        Response(res, 200, {
            blogs,
            count: blogsCount.count,
        });
    } catch (error) {
        errorHandler(res, error);
    }
};

const readBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const blogs = await blogsService.readCertainBlogs(id);

        Response(res, 200, {
            blogs,
        });
    } catch (error) {
        errorHandler(res, error);
    }
};

const readCertainBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [blog] = await blogsService.readCertainBlog(id);

        Response(res, 200, {
            blog,
        });
    } catch (error) {
        errorHandler(res, error);
    }
};

const thumbupBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [blog] = await blogsService.readBlogs(id);

        if (blog) {
            if (blog.userId !== req.user.id) {
                const likes = await likesService.readLikes({
                    userId: req.user.id,
                    blogId: id,
                });

                if (!likes.length) {
                    await likesService.createLike({
                        userId: req.user.id,
                        blogId: id,
                    });
                    Response(res, 200, {});
                } else {
                    errorHandler(res, ERRORS.THUMBUP_AGAIN_FORBIDDEN.code);
                }
            } else {
                errorHandler(res, ERRORS.THUMBUP_MYSELF.code);
            }
        } else {
            errorHandler(res, ERRORS.BLOG_NOT_EXIST.code);
        }
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, text, imageUrl, ...rest } = req.body;

        await blogsService.updateBlog(id, {
            title,
            text,
            imageUrl,
        });

        Response(res, 200, {}, MESSAGES.UPDATE_BLOG_SUCCESS);
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        await blogsService.deleteBlog(id);

        Response(res, 200, {}, MESSAGES.DELETE_BLOG_SUCCESS);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    createBlog,
    createComment,
    readBlogs,
    readBlog,
    readCertainBlog,
    thumbupBlog,
    updateBlog,
    deleteBlog,
};
