const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

// DATABASE CONNECTION
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB); // no extra options needed in Mongoose 6+

mongoose.set("strictQuery", true);

const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));
conn.once("open", () => {
  console.log("DB connection successful!");
});

//? SERVER
const port = 8000;
app.listen(port, "0.0.0.0", () => {
  console.log(`App running on port ${port}...`);
});
