const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const MessageController = require("../controllers/message.controller");

router.get(
  "/:receiverId",
  authMiddleware,
  MessageController.getMessages
);

module.exports = router;