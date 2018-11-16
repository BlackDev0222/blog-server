// node_modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// utils
const { Response } = require("../utils");

// services
const { userService } = require("../services");

// utils
const { errorHandler } = require("../utils");

// config
const { JWT_TOKEN, EXPIRATION_TIME } = require("../config");
const { ERRORS } = require("../consts");

const signin = async (req, res, next) => {
    try {
        const { email, password, ...rest } = req.body;
        const [user] = await userService.readUsersPassword({
            email,
        });

        if (user) {
            const passwordCorrect = await bcrypt.compare(
                password,
                user.password
            );

            if (passwordCorrect) {
                const token = jwt.sign({ id: user.id }, JWT_TOKEN, {
                    expiresIn: EXPIRATION_TIME,
                });

                Response(res, 200, {
                    userId: user.id,
                    token,
                    expirationTime: EXPIRATION_TIME,
                });
            } else {
                errorHandler(res, ERRORS.PASSWORD_NOT_CORRECT.code);
            }
        } else {
            errorHandler(res, ERRORS.EMAIL_NOT_EXIST.code);
        }
    } catch (error) {
        errorHandler(res, error);
    }
};

const signinGoogle = async (req, res, next) => {
    try {
        const { email, ...rest } = req.body;
        const [user] = await userService.readUsersPassword({
            email,
        });

        if (user) {
            const token = jwt.sign({ id: user.id }, JWT_TOKEN, {
                expiresIn: EXPIRATION_TIME,
            });

            Response(res, 200, {
                userId: user.id,
                token,
                expirationTime: EXPIRATION_TIME,
            });
        } else {
            errorHandler(res, ERRORS.EMAIL_NOT_EXIST.code);
        }
    } catch (error) {
        errorHandler(res, error);
    }
};

const signup = async (req, res, next) => {
    try {
        const { username, email, password, ...rest } = req.body;
        const existUsers = await userService.readUsers({
            email,
        });

        const userPassword = await bcrypt.hash(password, 8);

        if (!existUsers.length) {
            const newUserData = await userService.createUser({
                username,
                email,
                password: userPassword,
            });

            const newUserId = newUserData.insert_id;

            const token = jwt.sign({ id: newUserId }, JWT_TOKEN, {
                expiresIn: EXPIRATION_TIME,
            });

            Response(res, 200, {
                userId: newUserId,
                token,
                expirationTime: EXPIRATION_TIME,
            });
        } else {
            errorHandler(res, ERRORS.EMAIL_DUPLICATED.code);
        }
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    signin,
    signinGoogle,
    signup,
};
