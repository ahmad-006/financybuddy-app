
import React from "react";

const RecentTransactions = ({ transactions, currency }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      Food: "🛒",
      Utilities: "💡",
      Entertainment: "🎬",
      Income: "💰",
      Transportation: "🚗",
      Housing: "🏠",
    };
    return icons[category] || "📁";
  };

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0"
        >
          <div className="flex items-center">
            <span className="text-xl mr-4 bg-gray-100 p-2 rounded-lg">
              {getCategoryIcon(transaction.category)}
            </span>
            <div>
              <p className="font-medium text-gray-800">{transaction.title}</p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()} •{" "}
                {transaction.category}
              </p>
            </div>
          </div>
          <span
            className={`font-semibold ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}
            {currency} {transaction.amount.toLocaleString()}
          </span>
        </div>
      ))}

      {transactions.length === 0 && (
        <p className="text-gray-500 text-center py-8">No recent transactions</p>
      )}
    </div>
  );
};

export default RecentTransactions;
