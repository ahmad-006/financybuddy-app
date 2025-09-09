const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["income", "expense", "saving"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Food",
        "Shopping",
        "Salary",
        "Utilities",
        "Entertainment",
        "Housing",
        "Transportation",
        "Dining Out",
        "Income",
        "Saving",
      ],
    },
    amount: {
      type: Number,
      required: true,
    },
    budgetType: {
      type: String,
      trim: true,
      required: true,
      enum: ["Monthly", "Special", "None"],
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
