const Message = require("../models/message.model");
const User = require("../models/user.model");

class MessageController {
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


  static async getSidebarChats(req, res) {
    try {
      const myId = req.user.id;
      const messages = await Message.find({
        $or: [
          { senderId: myId },
          { receiverId: myId }
        ]
      }).sort({ createdAt: -1 });

      const uniqueUsers = new Map();

      for (const msg of messages) {
        const otherUserId =
          msg.senderId.toString() === myId
            ? msg.receiverId.toString()
            : msg.senderId.toString();

        if (!uniqueUsers.has(otherUserId)) {
          const user = await User.findById(otherUserId);

          if (user) {
            uniqueUsers.set(otherUserId, {
              id: user._id,
              name: user.name,
              avatar:
                user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}`,
              lastMessage: msg.message,
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              unread: 0,
            });
          }
        }
      }

      res.json({
        success: true,
        chats: Array.from(uniqueUsers.values()),
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