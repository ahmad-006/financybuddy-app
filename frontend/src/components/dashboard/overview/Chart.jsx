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
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Pre-fill months for the last 4 months
  const months = Array.from({ length: 4 }, (_, i) => {
    const monthIndex = (currentMonth - 3 + i + 12) % 12; // Get month index for last 4 months
    const year = currentYear + Math.floor((currentMonth - 3 + i) / 12); // Adjust year if necessary
    const date = new Date(year, monthIndex, 1);
    return {
      key: `${year}-${monthIndex + 1}`,
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
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (monthlyData[monthKey]) {
      if (transaction.type.toLowerCase() === "income") {
        monthlyData[monthKey].income += transaction.amount;
      } else if (transaction.type.toLowerCase() === "expense") {
        monthlyData[monthKey].spending += transaction.amount;
      }
    }
  });

  const chartData = Object.values(monthlyData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          angle={-45}
          textAnchor="end"
          height={60}
          tick={{ fontSize: 12 }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value) => [`${currency} ${value.toLocaleString()}`, "Amount"]}
          contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        />
        <Legend />
        <Bar dataKey="income" fill="#4CAF50" name="Income" barSize={25} />
        <Bar dataKey="spending" fill="#F44336" name="Spending" barSize={25} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
