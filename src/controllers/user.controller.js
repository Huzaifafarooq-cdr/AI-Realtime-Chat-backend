// src/controllers/user.controller.js

const User = require("../models/user.model");

class UserController {

  async getMe(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-__v");

      return res.json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.find({
        _id: { $ne: req.user.id },
      }).select("_id name email avatar isPremium createdAt");

      return res.json({
        success: true,
        users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();