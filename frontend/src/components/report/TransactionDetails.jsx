import React from "react";

const TransactionDetails = ({ transactions = [], currency = "$" }) => {
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
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Transaction Details
      </h3>
      <div className="space-y-2">
        {transactions
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">
                  {getCategoryIcon(transaction.category)}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {transaction.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {currency} {transaction.amount.toLocaleString()}
              </span>
            </div>
          ))}

        {transactions.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No transactions in this period
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;
