var express = require("express");
const router = express.Router();
var bookings = require("../controllers/booking.controller.js");

router.route("/").get(bookings.getAllBookings).post(bookings.insertBooking);
router
    .route("/:id")
    .get(bookings.getBooking)
    .patch(bookings.updateBooking)
    .delete(bookings.deleteBooking);

module.exports = router;
