const express = require("express");
const passport = require("passport");
const AuthController = require("../controllers/auth.controller");

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/google",
      passport.authenticate("google", {
        scope: ["profile", "email"],
      })
    );

    this.router.get(
      "/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/auth/failure",
      }),
      AuthController.googleCallback
    );

    this.router.get("/failure", AuthController.failure);
  }
}

module.exports = new AuthRoutes().router;