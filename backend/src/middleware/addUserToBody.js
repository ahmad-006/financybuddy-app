// const jwt = require("jsonwebtoken");
// // middleware/addUserToBody.js

// module.exports = (req, res, next) => {
//   try {
//     // Example: hardcoded userId (replace later with auth logic)
//     const userId = "68becd58e352b61918d93318";
//     // Ensure body exists
//     if (!req.body) req.body = {};

//     // Add user to body
//     req.body.user = userId;

//     const token = req.cookies.token;
//     if (!token) console.log("no token");

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);

//     next();
//   } catch (error) {
//     res.status(500).json({ status: "fail", message: "Could not attach user" });
//   }
// };

// middleware/addUserToBody.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Ensure body exists
    if (!req.body) req.body = {};

    // Get token from cookies
    console.log(req.cookies);
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId from token payload (instead of hardcoding)
    req.body.user = decoded.id; // assuming your token has { id: ... }

    console.log("Decoded user:", decoded);

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res
      .status(401)
      .json({ status: "fail", message: "Invalid or expired token" });
  }
};
