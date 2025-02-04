const passport = require('passport');
const db = require('../services/userServices');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      // Query PostgreSQL to find the user by ID
      const user = await db.getUserById(jwt_payload.id);

      if (!user) {
        return done(null, false); // No user found
      }

      return done(null, user); // Return user object
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
