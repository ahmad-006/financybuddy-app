const mongoose = require("mongoose");
const RecurringTransactions = require("../models/recurringTransactionModel");

// Get All transactions
exports.getAllRecurringTransactions = async (req, res) => {
  try {
    const { user } = req.body;
    const transactions = await RecurringTransactions.find({ user });

    res.status(200).json({
      status: "success",
      results: transactions.length,
      data: {
        transactions,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Create a new Recurring transactions
exports.createRecurringTransaction = async (req, res) => {
  const { user, title, type, frequency, category, amount, nextDate } = req.body;
  try {
    const newTransaction = await RecurringTransactions.create({
      user,
      title,
      category,
      frequency,
      type,
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
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Update an existing Recurring transactions
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
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Delete a Recurring transactions
exports.deleteRecurringTransaction = async (req, res) => {
  try {
    await RecurringTransactions.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
