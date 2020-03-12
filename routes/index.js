const express = require("express");
const router = new express.Router();

router.get("/", (req, res, next) => {
    res.render("index");
  });

 router.get("/", (req, res, next) => {
   res.render("partials/nav");
});

router.get("/contact", (req, res, next) => {
    res.render("contact");
 });

 router.get("/listeContacts", (req, res, next) => {
    res.render("listeContacts");
 });

  module.exports = router;
