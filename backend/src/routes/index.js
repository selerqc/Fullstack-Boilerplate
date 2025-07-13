
import express from 'express';
const router = express.Router();

// import UserRoute from './userRoute.js'
import AuthRoute from './authRoute.js'
import { StatusCodes } from 'http-status-codes';

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    routes: {
      google: "http://localhost:3000/api/auth/google",
      login: "http://localhost:3000/api/auth/",
      logout: "http://localhost:3000/api/auth/logout",
      status: "http://localhost:3000/api/auth/status"
    },
    status: StatusCodes.OK,
  });
});

router.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'ok',
  });
});

// router.use('/users', UserRoute)
router.use('/auth', AuthRoute)




export default router;