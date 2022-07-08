var users = require("../public/data/users.json");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const resp = users;
            res.json(resp);
        } catch (err) {
            next(err);
        }
    },
    getUser: (req, res, next) => {
        try {
            const user = users.find((b) => b.id === req.params.id);
            return res.json(user);
        } catch (err) {
            next(err);
        }
    },
    insertUser: (req, res, next) => {
        try {
            users = [...users, req.body];
            return res.json("successfully added");
        } catch (err) {
            next(err);
        }
    },
    updateUser: (req, res, next) => {
        try {
            users.forEach((user, index) =>
                user.id === req.params.id
                    ? (users[index] = req.body)
                    : (users[index] = user)
            );
            return res.json("successfully updated");
        } catch (err) {
            next(err);
        }
    },
    deleteUser: (req, res, next) => {
        try {
            const index = users.findIndex((user) => user.id === req.params.id);
            users.splice(index, 1);
            return res.json("deleted successfully");
        } catch (err) {
            next(err);
        }
    },
};
