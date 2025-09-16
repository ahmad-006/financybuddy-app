const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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
module.exports = {
  getUser,
  updateUser,
  resetPassword,
};
