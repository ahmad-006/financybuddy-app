const mongoose = require("mongoose");
const validator = require("validator");

const PendingUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    
    otp: {
      type: Number,
      required: true,
    },
    otpExpiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const PendingUser =
  mongoose.models.PendingUser ||
  mongoose.model("PendingUser", PendingUserSchema);

module.exports = PendingUser;
