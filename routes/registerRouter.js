const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectMongo = require("connect-mongo");
const passport = require("../DB/configPassport");
const log4js = require("../utils/logs");
const logConsole = log4js.getLogger("consola");
const logError = log4js.getLogger("error");
require("dotenv").config();

router.use(cookieParser());
router.use(
  session({
    store: connectMongo.create({
      mongoUrl: `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0.1lcuy.mongodb.net/${process.env.SESSIONSDB}?retryWrites=true&w=majority`,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 600,
    }),
    secret: `${process.env.SECRETDB}`,
    resave: true,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    logConsole.info("Login usuario");
    res.redirect("/");
  } else {
    logError.error("Error login usuario");
    res.render("pages/register");
  }
});

router.get("/error", (req, res) => {
  logError.error("Error");
  res.render("pages/registerError");
});

router.get("/exito", (req, res) => {
  logConsole.info("Usuario registrado con exito");
  res.render("pages/registerExito");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/register/exito");
  });
});

router.post(
  "/",
  passport.authenticate("registro", {
    successRedirect: "/register/logout",
    failureRedirect: "/register/error",
  })
);

module.exports = router;
