// node_modules
const router = require("express").Router();

// sub routes
const authRoute = require("./auth.route");
const usersRoute = require("./users.route");
const blogsRoute = require("./blogs.route");
const uploadRoute = require("./upload.route");

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/blogs", blogsRoute);
router.use("/upload", uploadRoute);

module.exports = router;
