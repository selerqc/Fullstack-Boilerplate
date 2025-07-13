
import mongoose from "mongoose";
import validator from 'validator'

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: null
  },
  username: {
    type: String,
    trim: true,
    required: function() {
      return !this.googleId;
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email'
    }
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    }
  }
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;