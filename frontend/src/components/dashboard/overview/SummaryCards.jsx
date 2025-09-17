// SummaryCards.jsx
import React from "react";

const SummaryCards = ({ totalIncome, totalSpending, remaining, currency }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
      {/* Total Income Card */}
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
            <span className="text-green-600 text-lg">💰</span>
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-xs text-gray-600 truncate">Total Income</p>
            <p className="text-sm sm:text-base font-bold text-gray-800">
              {currency} {totalIncome.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Total Spending Card */}
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
            <span className="text-red-600 text-lg">💸</span>
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-xs text-gray-600 truncate">Total Spending</p>
            <p className="text-sm sm:text-base font-bold text-gray-800">
              {currency} {totalSpending.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Remaining Balance Card */}
      <div
        className={`bg-white p-3 sm:p-4 rounded-xl shadow-sm border ${
          remaining >= 0 ? "border-green-200" : "border-orange-200"
        }`}
      >
        <div className="flex items-center">
          <div
            className={`p-2 rounded-full flex-shrink-0 ${
              remaining >= 0 ? "bg-green-100" : "bg-orange-100"
            }`}
          >
            <span
              className={`text-lg ${
                remaining >= 0 ? "text-green-600" : "text-orange-600"
              }`}
            >
              {remaining >= 0 ? "✅" : "⚠️"}
            </span>
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-xs text-gray-600 truncate">
              {remaining >= 0 ? "Remaining" : "Over Budget"}
            </p>
            <p
              className={`text-sm sm:text-base font-bold ${
                remaining >= 0 ? "text-green-700" : "text-orange-700"
              }`}
            >
              {currency} {Math.abs(remaining).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
