var express = require("express");
const router = express.Router();

const users = require("../controllers/user.controller.js");

router.route("/").get(users.getAllUsers).post(users.insertUser);
router
    .route("/:id")
    .get(users.getUser)
    .patch(users.updateUser)
    .delete(users.deleteUser);

module.exports = router;
