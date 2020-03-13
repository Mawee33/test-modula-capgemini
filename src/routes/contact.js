const express = require("express");

const router = new express.Router();

router.get("/contact", (_, res) => {
  res.render("contact");
});

module.exports = router;