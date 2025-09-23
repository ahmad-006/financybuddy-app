import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10F981",
  "#F55E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
];

const Charts = ({ budgetCategories, currency, transactions, budgets }) => {
  const pieData = budgetCategories
    .filter((cat) => cat.spent > 0)
    .map((cat, index) => ({
      name: cat.title,
      value: cat.spent,
      color: COLORS[index % COLORS.length],
    }));

  // Bar Chart: for last 6 months
  const monthlyData = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = d.toLocaleString("default", { month: "short" });
    const monthNumber = d.getMonth() + 1;
    const year = d.getFullYear();

    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);

    const totalSpent = transactions
      .filter((t) => t.type === "expense")
      .filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getMonth() + 1 === monthNumber && tDate.getFullYear() === year
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    monthlyData.push({
      month: monthName,
      budget: totalBudget,
      spent: totalSpent,
    });
  }

  return (
    <div>
      {/* Pie Chart */}
      <h2>Spending by Category</h2>
      {pieData.length > 0 ? (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${currency} ${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No spending data</p>
      )}

      {/* Bar Chart */}
      <h2>Monthly Trends (Last 6 Months)</h2>
      {monthlyData.length > 0 ? (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${currency} ${value}`} />
              <Legend />
              <Bar dataKey="spent" fill={COLORS[3]} name="Spent" />
              <Bar dataKey="budget" fill={COLORS[6]} name="Budget" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No monthly data</p>
      )}
    </div>
  );
};

export default Charts;
