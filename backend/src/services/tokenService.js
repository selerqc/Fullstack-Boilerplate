import config from '../config/config.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import TokenModel from "../models/tokenModel.js"
import ApiError from '../utils/ApiError.js'

const generateToken = (userId, expires, type, secret = config.jwt.JWT_SECRET) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await TokenModel.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.JWT_SECRET);
  const tokenDoc = await TokenModel.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token not found');
  }
  return tokenDoc;
};

const generateAuthToken = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.JWT_EXPIRATION);
  const accessToken = generateToken(user._id, accessTokenExpires, "ACCESS");

  const refreshTokenExpires = moment().add(config.jwt.JWT_REFRESH_EXPIRATION);
  const refreshToken = generateToken(user._id, refreshTokenExpires, "REFRESH");
  await saveToken(refreshToken, user._id, refreshTokenExpires, "REFRESH");

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthToken
}