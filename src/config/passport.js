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
          callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value;

           
            const allowedUsers = process.env.ALLOWED_USERS.split(",");
            if (!allowedUsers.includes(email)) {
              return done(null, false);
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