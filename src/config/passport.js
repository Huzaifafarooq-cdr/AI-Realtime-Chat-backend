const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AuthService = require("../services/auth.service");

class PassportConfig {
  static initialize() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "https://ai-realtime-chat-backend-4r7n.onrender.com/auth/google/callback",

           scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // ✅ SAFE email extraction
            const email = profile.emails?.[0]?.value;

            if (!email) {
              return done(new Error("No email found from Google"), null);
            }

            // ✅ SAFE allowed users check
            const allowedUsers = process.env.ALLOWED_USERS
              ? process.env.ALLOWED_USERS.split(",")
              : [];

            // (optional) if you want to restrict users
            if (allowedUsers.length > 0 && !allowedUsers.includes(email)) {
              return done(new Error("User not allowed"), false);
            }

            const user = await AuthService.findOrCreateUser(profile);

            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  }
}

module.exports = PassportConfig;