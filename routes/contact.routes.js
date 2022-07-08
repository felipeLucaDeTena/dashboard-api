var express = require("express");
const router = express.Router();

var contact = require("../controllers/contact.controller");

router.route("/").get(contact.getAllContacts).post(contact.insertContact);
router
    .route("/:id")
    .get(contact.getContact)
    .patch(contact.updateContact)
    .delete(contact.deleteContact);

module.exports = router;
