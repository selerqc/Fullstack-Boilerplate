import { Strategy as LocalStrategy } from 'passport-local';
import bCrypt from 'bcrypt'
import UserModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import config from '../config/config.js'



const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.JWT_SECRET,
};

export default {
  initializePassport(passport) {

    const authenticateUser = async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email: email });

        if (!user) return done(null, false, { message: 'User Not Found' });
        if (!user.password) return done(null, false, { message: "Use Google OAuth to login" });

        const isPasswordValid = await bCrypt.compare(password, user.password);
        if (!isPasswordValid) return done(null, false, { message: 'Invalid Password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }


    passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser))

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        console.log('Deserializing user ID:', id);
        const user = await UserModel.findById(id);
        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {

        return done(err);
      }
    });
  },


  initializeJwtPassport(passport) {
    const jwtVerify = async (payload, done) => {
      try {
        if (payload.type !== 'ACCESS') {
          throw new Error('Invalid token type');
        }
        const user = await UserModel.findById(payload.sub);
        if (!user) return done(null, false);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }

    passport.use(new JwtStrategy(opts, jwtVerify))
  },



}