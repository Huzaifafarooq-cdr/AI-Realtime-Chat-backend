const Message = require("../models/message.model");
const { getSuggestions } = require("../services/ai.service");
const User = require("../models/user.model");

const onlineUsers = new Map();

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    const userId = socket.user.id;

    onlineUsers.set(userId, socket.id);
    console.log("Authenticated user:", userId);

    socket.on("send_message", async ({ receiverId, message }) => {
      try {
        const senderId = userId; 

        const newMessage = await Message.create({
          senderId,
          receiverId,
          message,
        });

        const receiverSocketId = onlineUsers.get(receiverId);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", newMessage);
        }

        socket.emit("message_sent", newMessage);

      } catch (error) {
        console.error(" Message error:", error.message);
      }
    });

    socket.on("get_suggestions", async ({ text }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          return socket.emit("error", "User not found");
        }

        if (!user.isPremium) {
          return socket.emit("suggestions_locked", {
            message: "Upgrade to premium ",
          });
        }

        const suggestions = await getSuggestions(text);

        socket.emit("suggestions", suggestions);

      } catch (error) {
        console.error("Suggestion error:", error.message);
      }
    });

      socket.on("check_premium", async () => {
    try {
      const user = await User.findById(userId);

      socket.emit("premium_status", {
        isPremium: user?.isPremium || false,
      });
    } catch (error) {
      console.error(" Premium check error:", error.message);
    }
  });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);

      onlineUsers.delete(userId);
    });
  });
};

module.exports = chatSocket;