// config
const { UPLOAD_URL } = require("../config");
// utils
const { Response } = require("../utils");

const uploadImage = (req, res, next) => {
    const getBodyFileName = (file) => `${UPLOAD_URL}/${file.filename}`;

    const reqFiles = req.files.map(getBodyFileName);

    Response(res, 200, {
        imageUrls: reqFiles,
    });
};

module.exports = {
    uploadImage,
};
