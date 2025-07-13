import express from 'express'
import passport from 'passport';

const route = express.Router()

import authController from '../controllers/authController.js';

route.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], }));

route.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', }), authController.loginCallback
);

route.post('/login', authController.login)

route.delete('/logout', authController.logout);

route.get('/status', authController.checkAuth);



export default route