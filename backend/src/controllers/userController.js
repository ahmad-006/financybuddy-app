const mongoose = require("mongoose");
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
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
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

module.exports = {
  getUser,
  updateUser,
};
