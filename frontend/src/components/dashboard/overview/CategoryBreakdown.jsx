import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CategoryBreakdown = ({ transactions, currency }) => {
  const spendingByCategory = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      if (!spendingByCategory[t.title]) spendingByCategory[t.title] = 0;
      spendingByCategory[t.title] += t.amount;
    }
  });

  const chartData = Object.keys(spendingByCategory).map((key) => ({
    name: key,
    value: spendingByCategory[key],
  }));

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      {chartData.length > 0 ? (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${currency} ${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No expense data available</p>
      )}
    </div>
  );
};

export default CategoryBreakdown;
