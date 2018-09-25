// node_modules
const router = require("express").Router();

// controllers
const { authController } = require("../controllers");

router.post("/signin", authController.signin);
router.post("/google", authController.signinGoogle);
router.post("/signup", authController.signup);

module.exports = router;
