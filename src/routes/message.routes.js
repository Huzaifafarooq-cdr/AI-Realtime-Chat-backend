const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const MessageController = require("../controllers/message.controller");

class MessageRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // ==========================================
    // GET CHAT HISTORY
    // GET /messages/:receiverId
    // ==========================================
    this.router.get(
      "/:receiverId",
      authMiddleware,
      MessageController.getMessages
    );

    // ==========================================
    // GET SIDEBAR CHATS
    // GET /messages/sidebar
    // ==========================================
    this.router.get(
      "/sidebar",
      authMiddleware,
      MessageController.getSidebarChats
    );
  }
}

module.exports = new MessageRoutes().router;