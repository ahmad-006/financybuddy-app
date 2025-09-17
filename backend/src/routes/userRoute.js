const express = require("express");
const {
  getUser,
  updateUser,
  resetPassword,
  forgotPassword,
  resetForgotPassword,
} = require("../controllers/userController.js");
const addUserToBody = require("../middleware/addUserToBody");

const router = express.Router();

router.route("/get").get(addUserToBody, getUser);
router.route("/update").patch(addUserToBody, updateUser);
router.route("/reset-password").patch(addUserToBody, resetPassword);
router.route("/forgot-password").post(forgotPassword);
router.post("/reset-password/:token", resetForgotPassword);

module.exports = router;
