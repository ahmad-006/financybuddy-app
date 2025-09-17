const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const PendingUser = require("../models/pendingUserSchema");
const { sendMail } = require("../config/nodemailer");
const { generateOtpEmailHtml, generateWelcomeEmailHtml } = require("../utils/emailTemplates");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ status: "failed", message: "user already exists" });

    //if already pending
    await PendingUser.deleteOne({ email });

    //creating otp
    const otp = crypto.randomInt(100000, 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    ////

    await PendingUser.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendMail(
      email,
      "Please Verify Your OTP",
      null,
      generateOtpEmailHtml(otp)
    );
    return res.status(200).json({
      status: "success",
      message: "otp sent",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
const otpVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await PendingUser.findOne({ email });
    if (!record)
      return res.status(400).json({ message: "No pending registration" });

    if (otp !== record.otp || Date.now() > record.otpExpiresAt)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const user = await User.create({
      email: record.email,
      password: record.password, // already hashed
      name: record.name,
    });

    await PendingUser.deleteOne({ email });

    // Send welcome email
    const welcomeHtml = generateWelcomeEmailHtml(user.name);
    await sendMail(user.email, "Welcome to FinancyBuddy!", null, welcomeHtml);

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // Trim and validate both sides
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Password cannot be empty or whitespace",
      });
    }

    const hashed = await bcrypt.hash("12345678", 10);
    const check = await bcrypt.compare("12345678", hashed);

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).json({
      status: "success",
      message: "User logged in",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

const signOut = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  return res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
};

const verifyUser = (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ status: "fail", message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      status: "success",
      message: "User authenticated",
      user: decoded,
    });
  } catch (err) {
    res
      .status(401)
      .json({ status: "fail", message: "Invalid or expired token" });
  }
};

module.exports = {
  register,
  otpVerify,
  login,
  signOut,
  verifyUser,
};
