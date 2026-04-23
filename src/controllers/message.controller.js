const Message = require("../models/message.model");

class MessageController {
  constructor() {}

  // ==========================================
  // GET CHAT HISTORY
  // GET /messages/:receiverId
  // ==========================================
  getMessages = async (req, res) => {
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
  };

  // ==========================================
  // GET SIDEBAR CHATS
  // GET /messages/sidebar
  // ==========================================
  getSidebarChats = async (req, res) => {
    try {
      const myId = req.user.id;

      const chats = await Message.aggregate([
        {
          $match: {
            $or: [{ senderId: myId }, { receiverId: myId }],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$senderId", myId] },
                "$receiverId",
                "$senderId",
              ],
            },
            lastMessage: { $first: "$message" },
            createdAt: { $first: "$createdAt" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 0,
            userId: "$user._id",
            name: "$user.name",
            avatar: "$user.avatar",
            lastMessage: 1,
            time: {
              $dateToString: {
                format: "%H:%M",
                date: "$createdAt",
              },
            },
            unread: { $literal: 0 },
          },
        },
      ]);

      res.json({
        success: true,
        chats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = new MessageController();