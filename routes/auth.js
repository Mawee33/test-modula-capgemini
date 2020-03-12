const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./../model/user");

// Registering SIGNUP

router.get("/signup", (req, res) => {
    res.render("auth/signup");
  });
  
  router.post("/signup",  (req, res) => {
    const user = req.body; 
    userModel
      .findOne({ id: user.id })
      .then(dbRes => {
        if (dbRes) return res.redirect("/auth/signup");
        else {
          const salt = bcrypt.genSaltSync(10); // cryptography librairie
          const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
          user.password = hashed; // new user is ready for db
          userModel
            .create(user)
            .then(() => res.redirect("/auth/signin"))
            .catch(dbErr => console.log(dbErr));
        }
      })
      .catch(dbErr => next(dbErr));
  });
  
  // Login  SIGNIN
  
  router.get("/signin", (req, res) => {
    res.render("auth/signin");
  });
  
  router.post("/signin", (req, res) => {
    const user = req.body;
    if (!user.id|| !user.password) {
      // one or more field is missing
      req.flash("error", "wrong credentials");
      return res.redirect("/auth/signin");
    }
    userModel
      .findOne({ email: user.id})
      .then(dbRes => {
        if (!dbRes) {
          console.log("mauvais id");
          // no user found with this email;
          req.flash("error", "wrong credentials");
          return res.redirect("/auth/signin");
        }
        // user has been found in DB !
        if (bcrypt.compareSync(user.password, dbRes.password)) {
          // encryption says : password match success
          req.flash("success", `welcome ${dbRes.id}`);
          req.session.currentUser = dbRes; // user is now in session... until session.destroy
          return res.render("event");
        } else {
          // encryption says : password match failde
          req.flash("error", "wrong credentials");
          return res.redirect("/auth/signin");
        }
      })
      .catch(dbErr => {
        console.log(dbErr);
        req.flash("error", "system error ><*");
        res.redirect("/auth/signin");
      });
  });
  
  router.get("/logout", (req, res) => {
    req.session.destroy(err => {
      res.locals.isLoggedIn = false;
      // res.locals.isAdmin = false;
      res.redirect("/auth/signin");
    });
  });
  
  module.exports = router;