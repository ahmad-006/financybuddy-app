const express = require("express");
const userController = require("../controllers/userControllers");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
