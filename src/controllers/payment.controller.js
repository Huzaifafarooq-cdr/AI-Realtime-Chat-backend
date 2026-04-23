// src/controllers/payment.controller.js

const razorpayConfig = require("../config/razorpay");
const crypto = require("crypto");
const User = require("../models/user.model");

class PaymentController {
  constructor() {
    this.razorpay = razorpayConfig.getInstance();
  }

  createOrder = async (req, res) => {
    try {
      const { amount } = req.body;

      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_" + Date.now(),

        notes: {
          userId: req.user.id,
        },
      };

      const order = await this.razorpay.orders.create(options);

      res.json({ success: true, order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  verifyPayment = async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: "Invalid signature",
        });
      }

      await User.findByIdAndUpdate(req.user.id, {
        isPremium: true,
      });

      res.json({
        success: true,
        message: "Premium activated ",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  webhookHandler = async (req, res) => {
    try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

      const signature = req.headers["x-razorpay-signature"];

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(req.rawBody) 
        .digest("hex");

      if (expectedSignature !== signature) {
        return res.status(400).json({
          success: false,
          message: "Invalid webhook signature",
        });
      }

      const event = req.body.event;

      if (event === "payment.captured") {
        const payment = req.body.payload.payment.entity;

        const userId = payment.notes?.userId;

        if (userId) {
          await User.findByIdAndUpdate(userId, {
            isPremium: true,
          });

          console.log("Premium via webhook:", userId);
        }
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Webhook error:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new PaymentController();