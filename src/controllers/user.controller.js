// src/controllers/user.controller.js

const User = require("../models/user.model");

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMe };