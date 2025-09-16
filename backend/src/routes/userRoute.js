const express = require("express");
const { getUser, updateUser } = require("../controllers/userController.js");
const addUserToBody = require("../middleware/addUserToBody");
const router = express.Router();

router.route("/get").get(addUserToBody, getUser);
router.route("/update").get(addUserToBody, updateUser);

module.exports = router;
