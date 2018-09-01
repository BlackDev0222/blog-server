// node_modules
const router = require("express").Router();

// controllers
const { uploadController } = require("../controllers");

// utils
const { imageUploader } = require("../utils");

router.post(
    "/image",
    imageUploader.array("imgCollection", 2),
    uploadController.uploadImage
);

module.exports = router;
