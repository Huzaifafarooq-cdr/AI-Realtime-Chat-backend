const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const MessageController = require("../controllers/message.controller");

class MessageRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/sidebar",
      authMiddleware,
      MessageController.getSidebarChats
    );

    this.router.get(
      "/:receiverId",
      authMiddleware,
      MessageController.getMessages
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new MessageRoutes().getRouter();