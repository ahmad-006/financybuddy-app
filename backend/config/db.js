const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const connectDB = () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  mongoose.connect(DB);

  mongoose.set("strictQuery", true);

  const conn = mongoose.connection;
  conn.on("error", console.error.bind(console, "connection error:"));
  conn.once("open", () => {
    console.log("DB connection successful!");
  });
};

module.exports = connectDB;
