var bookings = require("../public/data/bookings.json");

module.exports = {
    getAllBookings: async function (req, res, next) {
        try {
            const resp = bookings;
            res.json(resp);
        } catch (err) {
            next(err);
        }
    },
    getBooking: async function (req, res, next) {
        try {
            const booking = bookings.find((b) => b.id === req.params.id);
            return res.json(booking);
        } catch (err) {
            next(err);
        }
    },
    insertBooking: (req, res, next) => {
        try {
            bookings = [...bookings, req.body];
            return res.json("successfully added");
        } catch (err) {
            next(err);
        }
    },
    updateBooking: async function (req, res, next) {
        try {
            bookings.forEach((booking, index) =>
                booking.id === req.params.id
                    ? (bookings[index] = req.body)
                    : (bookings[index] = booking)
            );
            return res.json("successfully updated");
        } catch (err) {
            next(err);
        }
    },
    deleteBooking: async function (req, res, next) {
        try {
            const index = bookings.findIndex(
                (booking) => booking.id === req.params.id
            );
            bookings.splice(index, 1);
            return res.json("successfully deleted");
        } catch (err) {
            next(err);
        }
    },
};
