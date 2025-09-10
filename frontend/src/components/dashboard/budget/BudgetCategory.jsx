import React from "react";
import { format } from "date-fns";
import { getCategoryIcon } from "@/utils/iconFunc"; // Import getCategoryIcon

const BudgetCategory = ({
  category,
  setEditingCategory,
  currency,
  isOverBudget,
  getProgressPercentage,
  getProgressColor,
}) => {
  const progressPercentage = getProgressPercentage(category);

  return (
    <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center min-w-0">
          <span className="text-2xl mr-3 flex-shrink-0">
            {getCategoryIcon(category.category)}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800 truncate text-base sm:text-lg">
              {category.title || category.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              Category: {category.category}
            </p>
            <p className="text-sm sm:text-base text-gray-600 truncate mt-1">
              <span className="font-medium">
                {currency} {(category.spent ?? 0).toLocaleString()}
              </span>{" "}
              of {currency} {(category.limit ?? 0).toLocaleString()}
            </p>
            {category.startDate && category.endDate && (
              <p className="text-xs text-gray-500 mt-1">
                {format(new Date(category.startDate), "MMM dd, yyyy")} -{" "}
                {format(new Date(category.endDate), "MMM dd, yyyy")}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className={`font-medium text-xs sm:text-sm whitespace-nowrap ${
              isOverBudget(category) ? "text-red-600" : "text-green-600"
            }`}
          >
            {currency}{" "}
            {Math.abs(
              (category.limit ?? 0) - (category.spent ?? 0)
            ).toLocaleString()}
            {isOverBudget(category) ? " over" : " left"}
          </span>

          <button
            className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
            onClick={() => setEditingCategory(category)}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getProgressColor(progressPercentage)}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>0%</span>
          <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCategory;
