const mongoose = require("mongoose");
const Transaction = require("../models/Transactionmodel");

const getAllTransactionsOfUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.body.user });
    res.status(200).json({
      status: "success",
      results: transactions.length,
      data: { transactions },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res
        .status(404)
        .json({ status: "fail", message: "Transaction not found" });
    }
    res.status(200).json({ status: "success", data: { transaction } });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const createTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res
      .status(201)
      .json({ status: "success", data: { transaction: newTransaction } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ status: "fail", message: "Transaction not found" });
    }
    res
      .status(200)
      .json({ status: "success", data: { transaction: updatedTransaction } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res
        .status(404)
        .json({ status: "fail", data: "Transaction not found" });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = {
  getAllTransactionsOfUser,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
