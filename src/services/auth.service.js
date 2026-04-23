const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

class AuthService {
  static async findOrCreateUser(profile) {
    const email = profile.emails[0].value;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email,
        avatar: profile.photos[0].value,
      });
    }

    return user;
  }

  static generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        name: user.name,      
        email: user.email,
        avatar: user.avatar,     
        isPremium: user.isPremium,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
  }
}

module.exports = AuthService;