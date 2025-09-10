const mongoose = require("mongoose");
const RecurringTransactions = require("../models/recurringTransactionModel");

// Get All transactions
exports.getAllRecurringTransactions = async (req, res) => {
  try {
    const { user } = req.body;
    const transaction = await RecurringTransactions.find({ user });

    res.status(200).json({
      status: "success",
      results: transaction.length,
      data: {
        transaction,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

// Create a new Recurring Transaction
exports.createRecurringTransaction = async (req, res) => {
  const { user, title, category, amount, nextDate } = req.body;
  try {
    const newTransaction = await RecurringTransactions.create({
      user,
      title,
      category,
      amount,
      nextDate,
    });
    res.status(200).json({
      status: "success",
      data: {
        newTransaction,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

// Update an existing Recurring Transaction
exports.updateRecurringTransaction = async (req, res) => {
  try {
    const updatedTransaction = await RecurringTransactions.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedTransaction,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

// Delete a Recurring Transaction
exports.deleteRecurringTransaction = async (req, res) => {
  try {
    await RecurringTransactions.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};
