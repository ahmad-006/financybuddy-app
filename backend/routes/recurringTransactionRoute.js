const express = require("express");

const recurringTransactionController = require("../controllers/recurringTransactionControllers");
const addUserToBody = require("../middleware/addUserToBody");
const router = express.Router();
router
  .route("/")
  .get(
    addUserToBody,
    recurringTransactionController.getAllRecurringTransactions
  )
  .post(
    addUserToBody,
    recurringTransactionController.createRecurringTransaction
  );

router
  .route("/:id")
  .delete(addUserToBody, recurringTransactionController.deleteRecurringTransaction)
  .patch(addUserToBody, recurringTransactionController.updateRecurringTransaction);

module.exports = router;
