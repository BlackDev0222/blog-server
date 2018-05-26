// node_modules
const { v4 } = require("uuid");
const multer = require("multer");

// configs
const { UPLOAD_URL } = require("../config");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_URL);
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, `${v4()}-${filename}`);
    },
});

const imageUploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only png, jpg or jpeg formats allowed!"));
        }
    },
});

module.exports = imageUploader;
