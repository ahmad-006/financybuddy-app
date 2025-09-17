const express = require("express");
const transactionController = require("../controllers/transactionControllers");
const addUserToBody = require("../middleware/addUserToBody");
const router = express.Router();

router
  .route("/")
  .get(addUserToBody, transactionController.getAllTransactionsOfUser)
  .post(addUserToBody, transactionController.createTransaction);

router
  .route("/:id")
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);
module.exports = router;
