const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');


const router = new express.Router();

const contactModel = require("./../model/contactModel.js");

const message = [];

router.get("/contact", (req, res, next) => {
    res.render("contact");
  });

  // router.post("/contact", function(req, res){
  //   message.push({name: req.body.name, firstName: req.body.firstName, email: req.body.email, message:req.body.message});
  //     res.redirect('/contact');
  // })

  module.exports = router;