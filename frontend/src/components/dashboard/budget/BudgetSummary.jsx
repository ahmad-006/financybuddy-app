import React from "react";

const BudgetSummary = ({
  totalAllocated,
  totalSpent,
  remainingBudget,
  currency,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
            <span className="text-blue-600 text-lg">💰</span>
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-xs text-gray-600 truncate">Total Budget</p>
            <p className="text-lg font-bold text-gray-800 truncate">
              {currency} {totalAllocated.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
            <span className="text-red-600 text-lg">💸</span>
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-xs text-gray-600 truncate">Total Spent</p>
            <p className="text-lg font-bold text-gray-800 truncate">
              {currency} {totalSpent.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`bg-white p-4 rounded-xl shadow-sm border ${
          remainingBudget >= 0 ? "border-green-200" : "border-orange-200"
        }`}
      >
        <div className="flex items-center">
          <div
            className={`p-2 rounded-full flex-shrink-0 ${
              remainingBudget >= 0 ? "bg-green-100" : "bg-orange-100"
            }`}
          >
            <span
              className={`text-lg ${
                remainingBudget >= 0 ? "text-green-600" : "text-orange-600"
              }`}
            >
              {remainingBudget >= 0 ? "✅" : "⚠️"}
            </span>
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-xs text-gray-600 truncate">
              {remainingBudget >= 0 ? "Remaining" : "Over Budget"}
            </p>
            <p
              className={`text-lg font-bold ${
                remainingBudget >= 0 ? "text-green-700" : "text-orange-700"
              }`}
            >
              {currency} {Math.abs(remainingBudget).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
