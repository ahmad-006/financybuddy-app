import React from "react";

const BudgetProgressReport = ({
  budgets = [],
  transactions = [],
  currency = "$",
}) => {
  const budgetsWithProgress = budgets.map((budget) => {
    const spent = transactions
      .filter((t) => t.category === budget.category && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const progress =
      budget.monthlyLimit > 0 ? (spent / budget.monthlyLimit) * 100 : 0;

    return {
      ...budget,
      spent,
      progress: Math.min(100, progress),
      isOverBudget: spent > budget.monthlyLimit,
    };
  });

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Budget Progress
      </h3>
      <div className="space-y-3">
        {budgetsWithProgress.map((budget) => (
          <div key={budget.id} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-800">
                {budget.category}
              </span>
              <span
                className={`text-xs ${
                  budget.isOverBudget ? "text-red-600" : "text-green-600"
                }`}
              >
                {Math.round(budget.progress)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div
                className={`h-2 rounded-full ${
                  budget.isOverBudget
                    ? "bg-red-500"
                    : budget.progress > 80
                      ? "bg-yellow-400"
                      : "bg-green-500"
                }`}
                style={{ width: `${Math.min(100, budget.progress)}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-600">
              <span>
                Spent: {currency} {budget.spent.toLocaleString()}
              </span>
              <span>
                Budget: {currency} {budget.limit.toLocaleString()}
              </span>
            </div>
          </div>
        ))}

        {budgets.length === 0 && (
          <p className="text-gray-500 text-center py-4">No budgets set up</p>
        )}
      </div>
    </div>
  );
};

export default BudgetProgressReport;
