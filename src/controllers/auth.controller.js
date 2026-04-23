const AuthService = require("../services/auth.service");

class AuthController {
  static googleCallback(req, res) {
    try {
      const user = req.user;
      const frontendURL = process.env.FRONTEND_URL;

      if (!user) {
        return res.redirect(
          `${frontendURL}/?error=auth_failed`
        );
      }

      const token = AuthService.generateToken(user);

      return res.redirect(
        `${frontendURL}/auth/callback?token=${token}`
      );
    } catch (error) {
      console.error("Google Callback Error:", error);

      return res.redirect(
        `${process.env.FRONTEND_URL}/?error=server_error`
      );
    }
  }

  static failure(req, res) {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = AuthController;