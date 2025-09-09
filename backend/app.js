const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./src/routes/userRoute");
const monthlyBudgetRouter = require("./src/routes/monthlyBudgetRoute");
const transactionRouter = require("./src/routes/transactionRoute");
const SpecialBudgetRouter = require("./src/routes/specialBudgetRoute");
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

module.exports = app;
