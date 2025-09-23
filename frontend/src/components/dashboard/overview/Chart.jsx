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

  // Create last 4 months array
  const months = [];
  for (let i = 3; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1);
    months.push({
      key: `${date.getFullYear()}-${date.getMonth() + 1}`,
      month: date.toLocaleString("default", { month: "short" }),
      income: 0,
      spending: 0,
    });
  }

  // Convert to object for easy access
  const monthData = {};
  months.forEach((m) => (monthData[m.key] = m));

  // Fill data
  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (monthData[key]) {
      if (t.type.toLowerCase() === "income") monthData[key].income += t.amount;
      else monthData[key].spending += t.amount;
    }
  });

  //get only values
  const chartData = Object.values(monthData);
  console.log(chartData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value) => [
            `${currency} ${value.toLocaleString()}`,
            "Amount",
          ]}
        />
        <Legend />
        <Bar dataKey="income" fill="#4CAF50" name="Income" />
        <Bar dataKey="spending" fill="#F44336" name="Spending" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
