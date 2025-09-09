const mongoose = require("mongoose");
const specialBudget = require("../models/specialBudgetModel");

// Get all Special Budgets for a user
exports.getAllSpecialBudgets = async (req, res) => {
  try {
    const { user } = req.body;
    const budgets = await specialBudget.find({ user });

    res.status(200).json({
      status: "success",
      results: budgets.length,
      data: {
        budgets,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

// Create a new Special Budget
exports.createSpecialBudget = async (req, res) => {
  const { user, title, category, limit, startDate, endDate } = req.body;
  try {
    const newBudget = await specialBudget.create({
      user,
      title,
      category,
      limit,
      startDate,
      endDate,
    });

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
      {
        title: req.body.title,
        category: req.body.category,
        limit: req.body.limit,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
      { new: true }
    );
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
