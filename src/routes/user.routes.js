// src/routes/user.routes.js

const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const UserController = require("../controllers/user.controller");

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/me",
      authMiddleware,
      UserController.getMe.bind(UserController)
    );

    this.router.get(
      "/all",
      authMiddleware,
      UserController.getAllUsers.bind(UserController)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new UserRoutes().getRouter();