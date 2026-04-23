const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");

const PassportConfig = require("../src/config/passport");
const authRoutes = require("../src/routes/auth.routes");

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  initializeMiddlewares() {
    this.app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "https://ai-realtime-chat-frontend.vercel.app",
        ],
        credentials: true,
      })
    );

    this.app.use(express.json());

    PassportConfig.initialize();
    this.app.use(passport.initialize());
  }

  initializeRoutes() {
    this.app.use("/auth", authRoutes);
    this.app.use("/user", require("./routes/user.routes"));
    this.app.use("/payment", require("./routes/payment.routes"));
    this.app.use("/messages", require("./routes/message.routes"));
  }

  getApp() {
    return this.app;
  }
}

module.exports = App;