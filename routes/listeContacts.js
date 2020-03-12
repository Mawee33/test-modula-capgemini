const express = require("express");
const mongoose = require("mongoose");
const mongoDB = require('mongodb');
const contactModel = require("./../model/contactModel.js");
const bodyParser = require('body-parser');


const router = new express.Router();

router.get("/listeContacts", (req, res) => {
  contactModel
    .find()
    .then(dbRes => {
      res.render("listeContacts", {
        listeContacts: dbRes,
      });
    });
});

// router.get("/listeContacts", (req, res, next) => {
//     res.render("listeContacts");
//   });

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

  router.post("/", async(req, res, next) => {
    const newContact = new contactModel(req.body);
    contactModel.create(newContact)
    .then(dbRes => {
      res.status(200).send(dbRes)
    })
    .catch(dbErr => {
      res.status(500).send(dbErr)
    });
});





  module.exports = router;