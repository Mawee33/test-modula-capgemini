require("dotenv").config();
require("./config/mongo");

const express = require('express');
const server = express();
const hbs = require('hbs');
const path = require('path');
const mongoose = require("mongoose");
var mongoDB = require('mongodb');
var util = require('util');
var EventEmitter = require('events');
var bodyParser = require('body-parser');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname + "/views/partials"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 600000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    saveUninitialized: true,
    resave: true
  })
);

server.use(flash());

server.use(function exposeFlashMessage(req, res, next) {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

server.use(function checkLoggedIn(req, res, next) {
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  res.locals.isAdmin = Boolean(
    req.session.currentUser && req.session.currentUser.role === "admin"
  );
  next();
});



function MyClass() { EventEmitter.call(this) };
util.inherits(MyClass, EventEmitter);

const index = require('./routes/index');
server.use('/', index);

const auth = require(`./routes/auth`);
server.use("/auth", auth);

const contact = require('./routes/contact');
server.use('/contact', contact);

const listeContacts = require('./routes/listeContacts');
server.use('/listeContacts', listeContacts);

server.listen(process.env.PORT);