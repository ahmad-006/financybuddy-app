const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../config/nodemailer");
const { generateResetPasswordEmailHtml } = require("../utils/emailTemplates");
const User = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    const userId = req.body.user;
    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({
        status: "fail",
        message: "User Not Found",
      });

    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.body.user;
    const { name, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, avatar },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, user: userID } = req.body;
    const user = await User.findById(userID);
    if (!user)
      return res.status(404).json({
        status: "fail",
        message: "User Not Found",
      });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({
        status: "fail",
        message: "Incorrect old Password",
      });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userID, { password: hashedPassword });

    return res.status(200).json({
      status: "success",
      message: "password changed",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //   Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ status: "fail", message: "No user with this email" });

    //   Generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    //   Hash token before saving to DB
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    //  Save hashed token and expiry
    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Send reset link via email
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
    const htmlEmail = generateResetPasswordEmailHtml(resetURL);
    await sendMail(
      user.email,
      "Reset Your Password",
      `Click this link to reset your password (valid for 5 mins): ${resetURL}`,
      htmlEmail
    );

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email!",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const resetForgotPassword = async (req, res) => {
  try {
    const { token } = req.params; // from link /reset-password/:token
    const { newPassword } = req.body;

    // hash token from URL
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      passwordResetToken: tokenHash,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token invalid or expired" });

    //  Update password
    user.password = await bcrypt.hash(newPassword, 12);

    //  Remove token fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};
module.exports = {
  getUser,
  updateUser,
  resetPassword,
  forgotPassword,
  resetForgotPassword,
};
