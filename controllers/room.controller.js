var rooms = require("../public/data/rooms.json");

module.exports = {
    getAllRooms: async (req, res, next) => {
        try {
            const resp = rooms;
            res.json(resp);
        } catch (err) {
            next(err);
        }
    },

    getRoom: (req, res, next) => {
        try {
            const room = rooms.find((b) => b.id === req.params.id);
            return res.json(room);
        } catch (err) {
            next(err);
        }
    },

    insertRoom: (req, res, next) => {
        try {
            rooms = [...rooms, req.body];
            return res.json("successfully added");
        } catch (err) {
            next(err);
        }
    },

    updateRoom: (req, res, next) => {
        try {
            rooms.forEach((room, index) =>
                room.id === req.params.id
                    ? (rooms[index] = req.body)
                    : (rooms[index] = room)
            );
            return res.json("successfully updated");
        } catch (err) {
            next(err);
        }
    },

    deleteRoom: (req, res, next) => {
        try {
            const index = rooms.findIndex((room) => room.id === req.params.id);
            rooms.splice(index, 1);
            return res.json("deleted successfully");
        } catch (err) {
            next(err);
        }
    },
};
