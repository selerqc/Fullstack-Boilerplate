import { StatusCodes } from "http-status-codes";
import authService from '../services/authService.js';
import passport from 'passport';

export default {
  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Authentication error',
          error: err.message
        });
      }

      if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({
        message: info?.message || 'Authentication failed'
      });


      req.logIn(user, async (err) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Login error',
            error: err.message
          });
        }

        try {
          const loginResult = await authService.login(user);
          res.status(StatusCodes.ACCEPTED).json({
            loginResult
          })
        } catch (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Token generation error',
            error: error.message
          });
        }
      });
    })(req, res, next);
  },

  loginCallback: async (req, res) => {
    try {
      const user = await authService.login(req.user)
      console.log(user)
      res.status(StatusCodes.OK).json({ user });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error
      })
    }
  },

  checkAuth(req, res) {
    if (req.isAuthenticated()) {
      res.status(StatusCodes.OK).json({
        authenticated: true,
        user: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email
        }
      });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        authenticated: false,
        message: 'Not authenticated'
      });
    }
  },

 async logout(req,res) {
  //  const user = await authService.logout(req.body.refreshToken)
   req.logout((err) => {
     if (err) {
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         message: 'Error during logout',
         error: err.message
       });
     }
     res.status(StatusCodes.OK).json({
       message: 'Logout successful'
     });
   });
  }
}