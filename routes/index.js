const express = require("express");
const router = new express.Router();

router.get("/", (_, res) => {
   res.render("index");
});

router.get("/", (_, res) => {
   res.render("partials/nav");
});

router.get("/", (_, res) => {
   res.render("partials/footer");
});

router.get("/contact", (_, res) => {
   res.render("contact");
});

module.exports = router;
