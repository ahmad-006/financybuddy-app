const mongoose = require("mongoose");
const MonthlyBudget = require("../models/monthlyBudgetModal");

// Get all Monthlybudgets for a user
exports.getAllMonthlyBudgets = async (req, res) => {
  try {
    const monthlyBudgets = await MonthlyBudget.find({ user: req.body.user });
    res.status(200).json({
      status: "success",
      results: monthlyBudgets.length,
      data: {
        monthlyBudgets,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Create a new Monthlybudget entry
exports.createMonthlyBudget = async (req, res) => {
  try {
    const { user, category, limit, title } = req.body;
    const monthlyBudget = await MonthlyBudget.create({
      user,
      category,
      limit,
      title,
    });
    res.status(201).json({
      status: "success",
      data: {
        monthlyBudget,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update an existing Monthlybudget entry
exports.updateMonthlyBudget = async (req, res) => {
  try {
    const { category, monthlyLimit, month, year } = req.body;
    const monthlyBudget = await MonthlyBudget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!monthlyBudget) {
      return res.status(404).json({
        status: "error",
        message: "MonthlyBudget not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        monthlyBudget,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete a Monthlybudget entry
exports.deleteMonthlyBudget = async (req, res) => {
  try {
    const monthlyBudget = await MonthlyBudget.findByIdAndDelete(req.params.id);
    if (!monthlyBudget) {
      return res.status(404).json({
        status: "error",
        message: "MonthlyBudget not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
