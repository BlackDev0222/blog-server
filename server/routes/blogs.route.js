// node_modules
const router = require("express").Router();

// controllers
const { blogsController } = require("../controllers");

// utils
const { checkAuth } = require("../utils");

router.post("/blog", checkAuth, blogsController.createBlog);
router.post("/comment/:id", checkAuth, blogsController.createComment);
router.get("/blogs", checkAuth, blogsController.readBlogs);
router.get("/blog/:id", checkAuth, blogsController.readBlog);
router.get("/certainBlog/:id", checkAuth, blogsController.readCertainBlog);
router.get("/thumbup/:id", checkAuth, blogsController.thumbupBlog);
router.put("/blog/:id", checkAuth, blogsController.updateBlog);
router.delete("/blog/:id", checkAuth, blogsController.deleteBlog);

module.exports = router;
