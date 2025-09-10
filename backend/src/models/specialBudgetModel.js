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
