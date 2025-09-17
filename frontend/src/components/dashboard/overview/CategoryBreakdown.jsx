// CategoryBreakdown.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CategoryBreakdown = ({ transactions, currency, isMobile }) => {
  // Calculate spending by category
  const spendingByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      if (!acc[transaction.title]) {
        acc[transaction.title] = 0;
      }
      acc[transaction.title] += transaction.amount;
      return acc;
    }, {});

  // Convert to array for chart
  const chartData = Object.entries(spendingByCategory)
    .map(([name, value]) => ({
      name,
      value,
      percentage:
        (value /
          Object.values(spendingByCategory).reduce(
            (sum, val) => sum + val,
            0
          )) *
        100,
    }))
    .sort((a, b) => b.value - a.value);

  // Color palette for categories
  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#6366F1",
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">
            {currency} {data.value.toLocaleString()}
          </p>
          <p className="text-sm text-blue-600">
            {data.percentage.toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {payload.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center text-xs sm:text-sm"
          >
            <div
              className="w-2.5 h-2.5 rounded-full mr-1.5"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {chartData.length > 0 ? (
        <>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? "30%" : "40%"}
                  outerRadius={isMobile ? "60%" : "70%"}
                  paddingAngle={2}
                  dataKey="value"
                  // Adjust label display based on screen size
                  label={({ percentage }) => {
                    // Show percentage only if it's large enough or on desktop
                    if (isMobile) {
                      return percentage > 8 ? `${percentage.toFixed(0)}%` : "";
                    } else {
                      return percentage > 5 ? `${percentage.toFixed(0)}%` : "";
                    }
                  }}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  content={renderLegend}
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: 20 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed breakdown list */}
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-gray-800 mb-3">
              Title Details
            </h3>
            {chartData.map((category, index) => (
              <div
                key={category.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {category.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {currency} {category.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {category.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-gray-500 text-lg">No spending data available</p>
          <p className="text-gray-400 text-sm mt-1">
            Add some expenses to see category breakdown
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdown;
