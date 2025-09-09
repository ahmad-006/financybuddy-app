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
import { mockTransactions, mockBudgets } from "../../../data/data";

const Charts = ({ budgetCategories, currency, year, userId }) => {
  const pieChartData = budgetCategories
    .filter((category) => category.spent > 0)
    .map((category) => ({
      name: category.name,
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

    return months.map((monthData) => {
      // Calculate total budget for the month
      const totalBudget = mockBudgets
        .filter((budget) => budget.userId === userId)
        .reduce((sum, budget) => sum + budget.monthlyLimit, 0);

      // Calculate total spent for the month
      const totalSpent = mockTransactions
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          const transactionMonth = transactionDate.getMonth() + 1;
          const transactionYear = transactionDate.getFullYear();
          
          return (
            transaction.userId === userId &&
            transaction.type === "expense" &&
            transactionMonth === monthData.value &&
            transactionYear === year
          );
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return {
        month: monthData.name,
        budget: totalBudget,
        spent: totalSpent,
      };
    });
  }, [year, userId]);

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
          Monthly Trends
        </h2>
        {monthlyTrendData && monthlyTrendData.length > 0 ? (
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `${currency} ${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    `${currency} ${value.toLocaleString()}`, 
                    name
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
