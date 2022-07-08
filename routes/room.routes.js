var express = require("express");
const router = express.Router();

var rooms = require("../controllers/room.controller.js");

router.route("/").get(rooms.getAllRooms).post(rooms.insertRoom);
router
    .route("/:id")
    .get(rooms.getRoom)
    .patch(rooms.updateRoom)
    .delete(rooms.deleteRoom);

module.exports = router;
