var users = require("../public/data/users.json");
const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async function (req, res, next) {
        try {
            const user = users.find(
                (b) =>
                    b.email.toLocaleLowerCase() ===
                    req.body.email.toLocaleLowerCase()
            );

            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: "user not found",
                });
            }
            if (compareSync(req.body.password, user.password)) {
                return res.status(401).send({
                    success: false,
                    message: "password not found",
                });
            }
            const payload = {
                user: user.username,
                id: user.id,
            };
            const token = jwt.sign(payload, "secretkey", { expiresIn: "1d" });
            return res.status(200).send({
                success: true,
                message: "login sucessfull",
                token: "Bearer " + token,
            });
        } catch (err) {
            next(err);
        }
    },
};
