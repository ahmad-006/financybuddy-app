import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ transactions, currency }) => {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Pre-fill months Jan -> current month
  const months = Array.from({ length: now.getMonth() + 1 }, (_, i) => {
    const date = new Date(currentYear, i, 1);
    return {
      key: `${currentYear}-${i + 1}`,
      month: date.toLocaleString("default", { month: "short" }),
      income: 0,
      spending: 0,
    };
  });

  const monthlyData = months.reduce((acc, m) => {
    acc[m.key] = m;
    return acc;
  }, {});

  // Merge in actual transactions
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    if (date.getFullYear() !== currentYear) return;

    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (transaction.type.toLowerCase() === "income") {
      monthlyData[monthKey].income += transaction.amount;
    } else if (transaction.type.toLowerCase() === "expense") {
      monthlyData[monthKey].spending += transaction.amount;
    }
  });

  const chartData = Object.values(monthlyData);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Income vs Spending
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${currency} ${value}`, "Amount"]}
            />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" name="Income" />
            <Bar dataKey="spending" fill="#F44336" name="Spending" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
