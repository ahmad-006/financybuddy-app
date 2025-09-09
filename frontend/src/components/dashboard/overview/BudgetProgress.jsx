// BudgetProgress.jsx
import React from "react";

const BudgetProgress = ({ budgets, transactions, currency, currentUser }) => {
  // Calculate months since user started using the app
  const calculateMonthsSinceStart = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    
    // More accurate calculation that handles partial months
    const yearDiff = now.getFullYear() - start.getFullYear();
    const monthDiff = now.getMonth() - start.getMonth();
    const totalMonths = yearDiff * 12 + monthDiff;
    
    // If we're past the start day of the month, count it as a full month
    const dayDiff = now.getDate() - start.getDate();
    
    return totalMonths + (dayDiff >= 0 ? 1 : 0);
  };

  const monthsSinceStart = calculateMonthsSinceStart(currentUser.createdAt);

  const budgetsWithProgress = budgets.map((budget) => {
    // Calculate total spending for this category since user started
    const spent = transactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        const userStartDate = new Date(currentUser.createdAt);
        return (
          t.category === budget.category && 
          t.type === "expense" &&
          t.userId === currentUser.id &&
          transactionDate >= userStartDate
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate cumulative budget limit since user started
    const cumulativeBudgetLimit = budget.monthlyLimit * monthsSinceStart;
    
    const progress = (spent / cumulativeBudgetLimit) * 100;

    return {
      ...budget,
      spent,
      cumulativeBudgetLimit,
      monthsSinceStart,
      progress: Math.min(100, progress),
      isOverBudget: spent > cumulativeBudgetLimit,
    };
  });

  return (
    <div className="space-y-3">
      {budgetsWithProgress.map((budget) => (
        <div key={budget.id} className="bg-gray-50 p-3 rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-800 text-sm sm:text-base truncate pr-2">
              {budget.category}
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
              Total Spent: {currency} {budget.spent.toLocaleString()}
            </span>
            <span className="text-xs text-gray-600">
              Total Budget: {currency} {budget.cumulativeBudgetLimit.toLocaleString()}
            </span>
          </div>

          {/* Additional Info */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Monthly: {currency} {budget.monthlyLimit.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">
              {budget.monthsSinceStart} month{budget.monthsSinceStart !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Over Budget Warning */}
          {budget.isOverBudget && (
            <div className="mt-1">
              <span className="text-xs text-red-600">
                ⚠️ {currency}{" "}
                {(budget.spent - budget.cumulativeBudgetLimit).toLocaleString()} over
                total budget
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
