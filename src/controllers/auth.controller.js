const AuthService = require("../services/auth.service");

class AuthController {
  static googleCallback(req, res) {
    try {
      const user = req.user;

      if (!user) {
        return res.redirect("http://localhost:3000/?error=auth_failed");
      }

      // ✅ Generate JWT token
      const token = AuthService.generateToken(user);

      // ✅ Send token to frontend
      return res.redirect(
        `http://localhost:3000/auth/callback?token=${token}`
      );
    } catch (error) {
      console.error("Google Callback Error:", error);
      return res.redirect("http://localhost:3000/?error=server_error");
    }
  }

  static failure(req, res) {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = AuthController;