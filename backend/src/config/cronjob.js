const RecurringTransactions = require("../models/recurringTransactionModel");
const Transaction = require("../models/transactionModel");

// ----------------- Cron Job -----------------

const scheduleTransactions = async () => {
  cron.schedule("1 0 * * *", async () => {
    console.log("Running auto-add recurring transactions...");

    const today = new Date();
    const recurringTransactions = await RecurringTransactions.find({
      isActive: true,
    });

    for (const rec of recurringTransactions) {
      const nextDue = new Date(rec.nextDate);
      if (nextDue <= today) {
        // Create a new transaction

        await Transaction.create({
          user: "68becd58e352b61918d93318",
          title: rec.title,
          amount: rec.amount,
          type: rec.type,
          category: rec.category,
          budgetType: "none",
          date: today,
        });

        // Update nextDate based on frequency
        const nextDue = new Date(rec.nextDate);
        let newNextDate;

        switch (rec.frequency) {
          case "daily":
            newNextDate = new Date(
              Date.UTC(
                nextDue.getUTCFullYear(),
                nextDue.getUTCMonth(),
                nextDue.getUTCDate() + 1
              )
            );
            break;
          case "weekly":
            newNextDate = new Date(
              Date.UTC(
                nextDue.getUTCFullYear(),
                nextDue.getUTCMonth(),
                nextDue.getUTCDate() + 7
              )
            );
            break;
          case "monthly":
            newNextDate = new Date(
              Date.UTC(
                nextDue.getUTCFullYear(),
                nextDue.getUTCMonth() + 1,
                nextDue.getUTCDate()
              )
            );
            break;
          case "yearly":
            newNextDate = new Date(
              Date.UTC(
                nextDue.getUTCFullYear() + 1,
                nextDue.getUTCMonth(),
                nextDue.getUTCDate()
              )
            );
            break;
          default:
            newNextDate = nextDue; // fallback
        }

        // Update in DB
        await RecurringTransactions.findByIdAndUpdate(rec._id, {
          nextDate: newNextDate,
        });
      }
    }
  });
};

module.exports = scheduleTransactions;
