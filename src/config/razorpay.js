const Razorpay = require("razorpay");

class RazorpayConfig {
  constructor() {
    this.instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  getInstance() {
    return this.instance;
  }
}

module.exports = new RazorpayConfig();