const express = require("express");
const mongoose = require("mongoose");
var mongoDB = require('mongodb');
const contactModel = require("./../model/contactModel.js");
var bodyParser = require('body-parser');


const router = new express.Router();

router.get("/listeContacts", (req, res, next) => {
    res.render("listeContacts");
  });

//   router.get("/listeContacts", (req, res) => {
//       contactModel
//       .findById(req.params.id)
//       .populate("contact")
//       .then(dbRes => {
//         console.log(dbRes.proposals);
//         res.render("proposals", {
//           events: dbRes,
//           css: ["event"]
//         });
//       })
//       .catch(err => console.log(err));
//   })

  router.post("/listContacts", async(req, res, next) => {
    const newContact = new Contact(req.body);
    newContact.save()
    .then(dbRes => {
      res.status(200).send(dbRes)
    })
    .catch(dbErr => {
      res.status(500).send(dbErr)
    });
});

  module.exports = router;