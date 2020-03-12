const express = require("express");
const contactModel = require("./../model/contactModel.js");

const router = new express.Router();

router.get("/", (req, res) => {
  contactModel
    .find()
    .then(dbRes => {
      res.render("listeContacts", {
        listeContacts: dbRes,
      });
    });
});

router.post('/', async (req, res, next) => {
  const newContact = new contactModel(req.body);
  contactModel
    .create(newContact)
    .then(() => {
      res.redirect('/listeContacts');
    })
    .catch(dbErr => {
      res.status(500).send(dbErr);
    });
});

  module.exports = router;