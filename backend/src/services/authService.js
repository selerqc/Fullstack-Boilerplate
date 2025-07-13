
import UserModel from '../models/userModel.js'
import { StatusCodes } from 'http-status-codes'
import Token from '../models/tokenModel.js'
import { generateAuthToken } from './tokenService.js';

export default {
  async login(userData) {
    console.log(userData)
    try {
      const token = await generateAuthToken(userData)

      return {
        success: true,
        message: "Login Successful",
        data: {
          token,
          user: userData
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "Login failed",
        error: error.message
      }
    }
  },

  async logout(refreshToken) {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: "REFRESH", blacklisted: true });
    if (!refreshTokenDoc) throw new Error('Not found');
    
    await refreshTokenDoc.remove();
  }
}