// middleware/addUserToBody.js
module.exports = (req, res, next) => {
  try {
    // Example: hardcoded userId (replace later with auth logic)
    const userId = "68becd58e352b61918d93318";

    // Ensure body exists
    if (!req.body) req.body = {};

    // Add user to body
    req.body.user = userId;

    next();
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Could not attach user" });
  }
};
