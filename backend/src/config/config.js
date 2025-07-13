import dotenv from 'dotenv';
dotenv.config({
  path: '.env'
});

const config = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
 

  mongoDb: {
    MONGO_URI: process.env.MONGO_URI,
    options: {
      minPoolSize: Number(process.env.OPTIONS_DB_MINIMUMPOOLSIZE || 5),
      maxPoolSize: Number(process.env.OPTIONS_DB_MAXIMUMPOOLSIZE || 30),
      serverSelectionTimeoutMS: process.env.OPTIONS_DB_SERVERSELECTIONTIMEOUTMILLISECONDS,
      socketTimeoutMS: process.env.OPTIONS_DB_SOCKETTIMEOUTMILLISECONDS,
    }
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
  cloudinary: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  googleClient: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  }
}

export default config;