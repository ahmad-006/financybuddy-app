const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoute");
const monthlyBudgetRouter = require("./routes/monthlyBudgetRoute");
const transactionRouter = require("./routes/transactionRoute");
const SpecialBudgetRouter = require("./routes/specialBudgetRoute");
const recurringTransactionRouter = require("./routes/recurringTransactionRoute");
const userRouter = require("./routes/userRoute");

//? built-in MIDDLEWARES
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://financybuddy.vercel.app", // Vercel deployment
      "https://financybuddy.netlify.app", // Netlify deployment
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}



//? ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/monthlyBudgets", monthlyBudgetRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/specialBudgets", SpecialBudgetRouter);
app.use("/api/v1/recurringTransactions", recurringTransactionRouter);

module.exports = app;
