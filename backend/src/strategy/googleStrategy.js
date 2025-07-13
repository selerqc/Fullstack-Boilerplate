import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import config from '../config/config.js'
import UserModel from '../models/userModel.js'

export default {
  initializeGooglePassport(passport) {
    passport.use(new GoogleStrategy({
      clientID: config.googleClient.GOOGLE_CLIENT_ID,
      clientSecret: config.googleClient.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      passReqToCallback: true
    },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;

          if (!email) return done(new Error("No email found in Google profile"), null);

          const existingUser = await UserModel.findOne({ email });

          if (existingUser) {
            return done(null, existingUser);
          }

          const newUser = new UserModel({
            googleId: profile.id,
            username: profile.name.givenName,
            email
          });

          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(error, null);
        }
      }
    ));
  }

}