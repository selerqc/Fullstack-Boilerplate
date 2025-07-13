
import UserModel from '../models/userModel.js'
import ApiError from '../utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'
import Token from '../models/tokenModel.js'
import initializePassport from '../auth/passportAuth.js'
export default {
  async loginUserWithEmailAndPassword(userData) {
    try {
      const user = initializePassport.a
    } catch (error) {
      return error
    }
  },

  async logout(refreshToken) {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: "REFRESH", blacklisted: false });
    if (!refreshTokenDoc) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.remove();
  }
}