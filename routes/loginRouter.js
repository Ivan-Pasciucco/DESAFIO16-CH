const express = require("express")
const router = express.Router()
const cookieParser = require("cookie-parser")
const session = require("express-session")
const connectMongo = require("connect-mongo")
const passport = require("../DB/configPassport")
const log4js = require("../utils/logs")
const logConsole = log4js.getLogger("consola")
const logError = log4js.getLogger("error")
require("dotenv").config()

router.use(cookieParser())
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
)
router.use(passport.initialize())
router.use(passport.session())

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    logConsole.info("Login usuario")
    res.redirect("/")
  } else {
    logError.error("Error login usuario")
    res.render("pages/login")
  }
})

router.get("/error", (req, res) => {
  logError.error("Error")
  res.render("pages/loginError")
})

router.post(
  "/",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login/error",
  })
)

router.get("/logout", (req, res) => {
  const nombre = req.session.passport.user
  req.logout((err) => {
    if (err) {
      logError.error("Error al cerrar sesion")
      res.send({ status: "logout error" })
    } else {
      logConsole.info("Sesion finalizada exitosamente")
      res.render("pages/logOut", { nombre })
    }
  })
})

module.exports = router
