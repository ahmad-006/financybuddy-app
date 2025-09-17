// middleware/addUserToBody.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Ensure body exists
    if (!req.body) req.body = {};

    // Get token from Authorization header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId from token payload (instead of hardcoding)
    req.body.user = decoded.id;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "fail", message: "Invalid or expired token" });
  }
};
