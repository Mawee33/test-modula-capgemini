const express = require("express");
const contactModel = require("./../model/contactModel.js");

const router = new express.Router();

async function getContacts() {
  router.get("/", async (_, res) => {
    contactModel
      .find()
      .then(dbRes => {
        res.render("listeContacts", {
          listeContacts: dbRes,
        });
      });
  });
}

getContacts();



router.post('/', async (req, res) => {
  const newContact = new contactModel(req.body);
  contactModel
    .create(newContact)
    .then(() => {
      req.flash("success", "message successfully created");
      return res.redirect('/contact');
    })
    .catch(dbErr => {
      res.status(500).send(dbErr);
    });
});

router.get("/:id", (req, res) => {
  contactModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      req.flash("success", "contact successfully deleted");
      res.redirect("/listeContacts");
    })
    .catch(dbErr => console.log("err", dbErr));
});



module.exports = router;