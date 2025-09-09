const express = require("express");
const monthlyBudgetController = require("../controllers/monthlyBudgetControllers");
const addUserToBody = require("../middleware/addUserToBody");

const router = express.Router();

router
  .route("/")
  .get(addUserToBody, monthlyBudgetController.getAllMonthlyBudgets)
  .post(addUserToBody, monthlyBudgetController.createMonthlyBudget);

router
  .route("/:id")
  .delete(monthlyBudgetController.deleteMonthlyBudget)
  .patch(monthlyBudgetController.updateMonthlyBudget);

module.exports = router;
