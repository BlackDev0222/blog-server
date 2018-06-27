// node_modules
const express = require("express");
const path = require("path");
const cors = require("cors");

// config
const { PORT, UPLOAD_URL, ROUTE_VERSION } = require("../config");

// consts
const { MESSAGES } = require("../consts");

// routes
const appRoutes = require("../routes");

// middleware
const { ROUTE_MIDDLEWARE } = require("../utils");

const port = process.env.PORT || 3000;

const backendSetup = (app) => {
    app.use("/uploads", express.static(UPLOAD_URL));

    app.use(express.json());
    app.use(cors());

    app.use(ROUTE_MIDDLEWARE);

    app.use(`/api/${ROUTE_VERSION}/`, appRoutes);

    app.listen(port, () => {
        console.info(MESSAGES.SERVER_START_SUCCESS);
    });
};

module.exports = backendSetup;
