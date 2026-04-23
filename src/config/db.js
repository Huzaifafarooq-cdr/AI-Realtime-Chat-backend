const mongoose = require("mongoose");

class Database {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log(" MongoDB connected successfully");
    } catch (error) {
      console.error("Error message:", error.message);

    }
  }
}

module.exports = Database;