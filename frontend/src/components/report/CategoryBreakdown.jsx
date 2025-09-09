import React from "react";

const CategoryBreakdown = ({ transactions = [], currency = "$" }) => {
  const spendingByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

  const totalSpending = Object.values(spendingByCategory).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Category Breakdown
      </h3>
      <div className="space-y-3">
        {Object.entries(spendingByCategory)
          .sort(([, a], [, b]) => b - a)
          .map(([category, amount]) => {
            const percentage =
              totalSpending > 0 ? (amount / totalSpending) * 100 : 0;

            return (
              <div
                key={category}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-800">
                  {category}
                </span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {currency} {amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            );
          })}

        {Object.keys(spendingByCategory).length === 0 && (
          <p className="text-gray-500 text-center py-4">No spending data</p>
        )}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
