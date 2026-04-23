const Message = require("../models/message.model");

class MessageController {
  // Get chat history between logged-in user and selected user
  static async getMessages(req, res) {
    try {
      const senderId = req.user.id;
      const receiverId = req.params.receiverId;

      const messages = await Message.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      }).sort({ createdAt: 1 });

      res.json({
        success: true,
        messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = MessageController;