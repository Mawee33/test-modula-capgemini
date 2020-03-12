const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require('body-parser');


const router = new express.Router();

const contactModel = require("./../model/contactModel.js");

router.get("/contact", (req, res, next) => {
    res.render("contact");
  });

//   router.post("/contact", function(req, res){
//       console.log(req.body);
//   })

  module.exports = router;