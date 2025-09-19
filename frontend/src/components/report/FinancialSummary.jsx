import React from "react";

const FinancialSummary = ({
  totalIncome = 0,
  totalSpending = 0,
  netBalance = 0,
  currency = "$",
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600 mb-1">
              Total Income
            </p>
            <p className="text-2xl font-bold text-green-700">
              {currency} {totalIncome.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-600 mb-1">
              Total Spending
            </p>
            <p className="text-2xl font-bold text-red-700">
              {currency} {totalSpending.toLocaleString()}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <span className="text-2xl">💸</span>
          </div>
        </div>
      </div>

      <div
        className={`${netBalance >= 0 ? "bg-blue-50 border-blue-200" : "bg-orange-50 border-orange-200"} border rounded-lg p-6`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-sm font-medium mb-1 ${netBalance >= 0 ? "text-blue-600" : "text-orange-600"}`}
            >
              Net Balance
            </p>
            <p
              className={`text-2xl font-bold ${netBalance >= 0 ? "text-blue-700" : "text-orange-700"}`}
            >
              {netBalance >= 0 ? "+" : ""}
              {currency} {netBalance.toLocaleString()}
            </p>
          </div>
          <div
            className={`${netBalance >= 0 ? "bg-blue-100" : "bg-orange-100"} p-3 rounded-full`}
          >
            <span className="text-2xl">{netBalance >= 0 ? "📈" : "📉"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
