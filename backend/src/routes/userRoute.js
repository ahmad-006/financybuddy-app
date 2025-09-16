const express = require("express");
const {
  getUser,
  updateUser,
  resetPassword,
} = require("../controllers/userController.js");
const addUserToBody = require("../middleware/addUserToBody");

const router = express.Router();

router.route("/get").get(addUserToBody, getUser);
router.route("/update").patch(addUserToBody, updateUser);
router.route("/reset-password").patch(addUserToBody, resetPassword);

module.exports = router;
