const mongoose = require("mongoose");

const recurringTransactionModel = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "food",
        "dining out",
        "shopping",
        "housing",
        "utilities",
        "transportation",
        "entertainment",
        "income",
        "philanthropy",
        "healthcare",
        "education",
        "subscriptions",
        "savings",
      ],
    },
    amount: {
      type: Number,
      required: true,
    },
    nextDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const RecurringTransactions = mongoose.model(
  "RecurringTransactions",
  recurringTransactionModel
);

module.exports = RecurringTransactions;
