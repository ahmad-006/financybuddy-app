const express = require("express");
const app = express();
const cron = require("node-cron");
const morgan = require("morgan");
const cors = require("cors");

const RecurringTransactions = require("./src/models/recurringTransactionModel");
const Transaction = require("./src/models/transactionModel");
const mongoose = require("mongoose");

const userRouter = require("./src/routes/userRoute");
const monthlyBudgetRouter = require("./src/routes/monthlyBudgetRoute");
const transactionRouter = require("./src/routes/transactionRoute");
const SpecialBudgetRouter = require("./src/routes/specialBudgetRoute");
const recurringTransactionRouter = require("./src/routes/recurringTransactionRoute");
//? MIDDLEWARES

app.use(
  cors({
    origin: "http://localhost:5173", // allow frontend
    credentials: true, // allow cookies if needed
  })
);

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//? ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/monthlyBudgets", monthlyBudgetRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/specialBudgets", SpecialBudgetRouter);
app.use("/api/v1/recurringTransactions", recurringTransactionRouter);

// ----------------- Cron Job -----------------

cron.schedule("0 1 * * *", async () => {
  // This runs every hour (you can adjust frequency)
  console.log("Running auto-add recurring transactions...");

  const today = new Date();
  const recurringTransactions = await RecurringTransactions.find({
    isActive: true,
  });

  recurringTransactions.forEach(async (rec) => {
    const nextDue = new Date(rec.nextDate);
    if (nextDue <= today) {
      // Create a new transaction
      await Transaction.create({
        user: "68becd58e352b61918d93318",
        title: rec.title,
        amount: rec.amount,
        type: rec.type,
        category: rec.category,
        budgetType: "none",
        date: today,
      });

      // Update nextDate based on frequency
      const nextDue = new Date(rec.nextDate);
      let newNextDate;

      switch (rec.frequency) {
        case "daily":
          newNextDate = new Date(
            Date.UTC(
              nextDue.getUTCFullYear(),
              nextDue.getUTCMonth(),
              nextDue.getUTCDate() + 1
            )
          );
          break;
        case "weekly":
          newNextDate = new Date(
            Date.UTC(
              nextDue.getUTCFullYear(),
              nextDue.getUTCMonth(),
              nextDue.getUTCDate() + 7
            )
          );
          break;
        case "monthly":
          newNextDate = new Date(
            Date.UTC(
              nextDue.getUTCFullYear(),
              nextDue.getUTCMonth() + 1,
              nextDue.getUTCDate()
            )
          );
          break;
        case "yearly":
          newNextDate = new Date(
            Date.UTC(
              nextDue.getUTCFullYear() + 1,
              nextDue.getUTCMonth(),
              nextDue.getUTCDate()
            )
          );
          break;
        default:
          newNextDate = nextDue; // fallback
      }

      // Update in DB
      await RecurringTransactions.findByIdAndUpdate(rec._id, {
        nextDate: newNextDate,
      });
    }
  });
});

module.exports = app;
