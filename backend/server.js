const app = require("./app");
const connectDB = require("./config/db");

//connecting DB
connectDB();

// SERVER
const port = process.env.PORT || 8000; // Fly injects PORT
app.listen(port, "0.0.0.0", () => {
  console.log(`App running on port ${port}...`);
});
