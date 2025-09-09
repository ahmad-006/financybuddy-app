const express = require("express");

const specialBudgetController = require("../controllers/specialBudgetControllers");
const addUserToBody = require("../middleware/addUserToBody");
const router = express.Router();
router
  .route("/")
  .get(addUserToBody, specialBudgetController.getAllSpecialBudgets)
  .post(addUserToBody, specialBudgetController.createSpecialBudget);

router
  .route("/:id")
  .delete(specialBudgetController.deleteSpecialBudget)
  .patch(specialBudgetController.updateSpecialBudget);

module.exports = router;
