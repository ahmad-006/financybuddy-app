const express = require("express");
const {
  register,
  otpVerify,
  login,
  signOut,
  verifyUser,
} = require("../controllers/authControllers");

const router = express.Router();

router.route("/register").post(register);
router.route("/verify-otp").post(otpVerify);
router.route("/login").post(login);
router.route("/signout").post(signOut);
router.route("/verify").get(verifyUser);

module.exports = router;
