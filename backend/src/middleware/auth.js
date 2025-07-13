
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';

const authMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Authentication error',
        error: err.message
      });
    }

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized - Invalid or missing JWT token',
        details: info?.message || 'Please provide a valid JWT token in the Authorization header'
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export { authMiddleware };