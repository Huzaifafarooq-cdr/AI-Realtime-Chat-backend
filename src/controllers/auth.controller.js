class AuthController {
  static googleCallback(req, res) {
    try {
      const user = req.user;

      if (!user) {
        return res.redirect("/auth/failure");
      }

      return res.send("Login success");
    } catch (error) {
      return res.status(500).json({ message: "Auth failed" });
    }
  }

  static failure(req, res) {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = AuthController;