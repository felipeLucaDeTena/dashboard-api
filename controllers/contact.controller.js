var contact = require("../public/data/contact.json");

module.exports = {
    getAllContacts: async (req, res, next) => {
        try {
            const resp = contact;
            res.json(resp);
        } catch (err) {
            next(err);
        }
    },
    getContact: (req, res, next) => {
        try {
            const contact = contact.find((b) => b.id === req.params.id);
            return res.json(contact);
        } catch (err) {
            next(err);
        }
    },
    insertContact: (req, res, next) => {
        try {
            contact = [...contact, req.body];
            return res.json("contact added");
        } catch (err) {
            next(err);
        }
    },
    updateContact: (req, res, next) => {
        try {
            contact.forEach((element, index) =>
                element.id === req.params.id
                    ? (contact[index] = req.body)
                    : (contact[index] = element)
            );
            return res.json("contact updated");
        } catch (err) {
            next(err);
        }
    },
    deleteContact: (req, res, next) => {
        try {
            const index = contact.findIndex(
                (contact) => contact.id === req.params.id
            );
            contact.splice(index, 1);
            return res.json("deleted successfully");
        } catch (err) {
            next(err);
        }
    },
};
