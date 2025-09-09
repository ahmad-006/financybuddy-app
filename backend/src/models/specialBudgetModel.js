const mongoose = require("mongoose");

const specialBudgetSchema = new mongoose.Schema(
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
        "Food",
        "Shopping",
        "Salary",
        "Utilities",
        "Entertainment",
        "Housing",
        "Transportation",
        "Dining Out",
        "Income",
      ],
    },
    limit: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const SpecialBudget = mongoose.model("SpecialBudget", specialBudgetSchema);

module.exports = SpecialBudget;
