
import React from "react";

const BudgetProgress = ({ budgets, transactions, currency }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const budgetsWithProgress = budgets.map((budget) => {
    const spent = transactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        return (
          t.title === budget.title &&
          t.type === "expense" &&
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const progress = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;

    return {
      ...budget,
      spent,
      progress: Math.min(100, progress),
      isOverBudget: spent > budget.limit,
    };
  });

  return (
    <div className="space-y-3">
      {budgetsWithProgress.map((budget) => (
        <div key={budget.title} className="bg-gray-50 p-3 rounded-lg">

          //? Header

          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-800 text-sm sm:text-base truncate pr-2 uppercase">
              {budget.title}
            </span>
            <span
              className={`text-xs sm:text-sm whitespace-nowrap ${
                budget.isOverBudget ? "text-red-600" : "text-green-600"
              }`}
            >
              {Math.round(budget.progress)}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div
              className={`h-full rounded-full ${
                budget.isOverBudget
                  ? "bg-red-500"
                  : budget.progress > 80
                    ? "bg-yellow-400"
                    : "bg-green-500"
              }`}
              style={{ width: `${Math.min(100, budget.progress)}%` }}
            ></div>
          </div>
          {/* Amounts */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">
              Spent: {currency} {budget.spent.toLocaleString()}
            </span>
            <span className="text-xs text-gray-600">
              Budget: {currency} {budget.limit.toLocaleString()}
            </span>
          </div>
          {/* Over Budget Warning */}
          {budget.isOverBudget && (
            <div className="mt-1">
              <span className="text-xs text-red-600">
                ⚠️ {currency} {(budget.spent - budget.limit).toLocaleString()}{" "}
                over budget
              </span>
            </div>
          )}
        </div>
      ))}

      {budgets.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-gray-500 text-sm">No budgets set up</p>
        </div>
      )}
    </div>
  );
};

export default BudgetProgress;
