// utils
const { Response } = require("../utils");

// services
const { userService } = require("../services");

// utils
const { errorHandler } = require("../utils");

// config
const { ERRORS } = require("../consts");

const me = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const [user] = await userService.readUsers({
            id: userId,
        });

        if (user) {
            Response(res, 200, {
                user,
            });
        } else {
            errorHandler(res, ERRORS.USER_NOT_EXIST);
        }
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { username, oldPassword, password, photoUrl } = req.body;
        if (oldPassword) {
            const [user] = await userService.readUsers({
                id: userId,
            });

            const passwordCorrect = await bcrypt.compare(
                oldPassword,
                user.password
            );

            if (passwordCorrect) {
                const user = await userService.updateUser(userId, {
                    username,
                    photoUrl,
                });

                Response(res, 200, {
                    user,
                });
            } else {
                errorHandler(res, ERRORS.OLD_PASSWORD_NOT_CORRECT.code);
            }
        } else {
            const user = await userService.updateUser(userId, {
                username,
                photoUrl,
            });

            Response(res, 200, {
                user,
            });
        }
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    me,
    updateUser,
};
