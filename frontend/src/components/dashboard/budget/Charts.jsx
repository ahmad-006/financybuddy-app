import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={10} textAnchor="middle" fill="#666">
        {payload.value}
      </text>
    </g>
  );
};

const Charts = ({
  budgetCategories,
  currency,
  year,
  transactions,
  budgets,
}) => {
  const pieChartData = budgetCategories
    .filter((category) => category.spent > 0)
    .map((category) => ({
      name: category.title,
      value: category.spent,
      color: category.color,
    }));

  // Generate monthly trend data based on actual transactions and budgets
  const monthlyTrendData = useMemo(() => {
    const months = [
      { name: "Jan", value: 1 },
      { name: "Feb", value: 2 },
      { name: "Mar", value: 3 },
      { name: "Apr", value: 4 },
      { name: "May", value: 5 },
      { name: "Jun", value: 6 },
      { name: "Jul", value: 7 },
      { name: "Aug", value: 8 },
      { name: "Sep", value: 9 },
      { name: "Oct", value: 10 },
      { name: "Nov", value: 11 },
      { name: "Dec", value: 12 },
    ];

    const fullData = months.map((monthData) => {
      const totalBudget = budgets.reduce(
        (sum, budget) => sum + budget.limit,
        0
      );

      const budgetTitles = new Set(
        budgets.map((budget) => budget.title.toLowerCase())
      );
      const totalSpent = transactions
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          const transactionMonth = transactionDate.getMonth() + 1;
          const transactionYear = transactionDate.getFullYear();

          return (
            transaction.type === "expense" &&
            transactionMonth === monthData.value &&
            transactionYear === year &&
            budgetTitles.has(transaction.title.toLowerCase())
          );
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return {
        month: monthData.name,
        budget: totalBudget,
        spent: totalSpent,
      };
    });

    // Always return only last 6 months
    return fullData.slice(-6);
  }, [year, budgets, transactions]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Spending by Category Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Spending by Category
        </h2>
        {pieChartData.length > 0 ? (
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${currency} ${value}`, "Spent"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">
              No spending data for selected period
            </p>
          </div>
        )}
      </div>

      {/* Monthly Trends Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Monthly Trends (Last 6 Months)
        </h2>
        {monthlyTrendData && monthlyTrendData.length > 0 ? (
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyTrendData}
                key={`${year}-${transactions.length}-${budgets.length}`}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  interval={0}
                  type="category"
                  tick={<CustomXAxisTick />}
                />
                <YAxis
                  domain={[0, "auto"]}
                  tickFormatter={(value) =>
                    `${currency} ${value.toLocaleString()}`
                  }
                />
                <Tooltip
                  formatter={(value, name) => [
                    `${currency} ${value.toLocaleString()}`,
                    name,
                  ]}
                />
                <Legend />
                <Bar dataKey="spent" fill="#FF6384" name="Amount Spent" />
                <Bar dataKey="budget" fill="#36A2EB" name="Budget Limit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">
              No monthly trend data available for {year}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
