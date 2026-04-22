const express = require("express");
const PaymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

class PaymentRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/create-order",
      authMiddleware,
      PaymentController.createOrder
    );

    this.router.post(
      "/verify",
      authMiddleware,
      PaymentController.verifyPayment
    );

    this.router.post(
      "/webhook",
      express.json({
        verify: (req, res, buf) => {
          req.rawBody = buf;
        },
      }),
      PaymentController.webhookHandler
    );
  }
}

module.exports = new PaymentRoutes().router;