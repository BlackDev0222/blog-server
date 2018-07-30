// node_modules
const router = require("express").Router();

// controllers
const { usersController } = require("../controllers");

// utils
const { checkAuth } = require("../utils");

router.get("/me", checkAuth, usersController.me);
router.put("/user", checkAuth, usersController.updateUser);

module.exports = router;
