const mongoose = require("mongoose");
const specialBudget = require("../models/specialBudgetModel");

// Get all Special Budgets for a user
exports.getAllSpecialBudgets = async (req, res) => {
  try {
    const user = req.body.user;
    const specialBudgets = await specialBudget.find({ user });
    res.status(200).json({
      status: "success",
      results: specialBudgets.length,
      data: {
        specialBudgets,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

// Create a new Special Budget
exports.createSpecialBudget = async (req, res) => {
  try {
    const newBudget = await specialBudget.create(req.body);

    res.status(200).json({
      status: "success",

      data: {
        newBudget,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};
// Update an existing Special Budget
exports.updateSpecialBudget = async (req, res) => {
  try {
    const updatedBudget = await specialBudget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBudget) {
      return res
        .status(404)
        .json({ status: "fail", message: "Special Budget not found" });
    }
    res.status(200).json({
      status: "success",

      data: {
        updatedBudget,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

// Delete a Special Budget
exports.deleteSpecialBudget = async (req, res) => {
  try {
    await specialBudget.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};
