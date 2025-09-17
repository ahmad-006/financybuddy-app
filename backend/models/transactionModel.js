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
    budgetType: {
      type: String,
      trim: true,
      required: true,
      enum: ["monthly", "special", "none"],
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
