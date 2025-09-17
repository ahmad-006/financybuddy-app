import React from "react";
import { format } from "date-fns";
import { getCategoryIcon } from "@/utils/iconFunc";

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
    <div className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
        <div className="flex items-center min-w-0 w-full sm:w-auto">
          <span className="text-2xl mr-3 flex-shrink-0">
            {getCategoryIcon(category.category)}
          </span>
          <div className="min-w-0 flex-grow">
            <h3 className="font-semibold text-gray-800 truncate text-base sm:text-lg">
              {category.title || category.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              Category: {category.category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-sm sm:text-base text-gray-600 truncate">
            <span className="font-medium">
              {currency} {(category.spent ?? 0).toLocaleString()}
            </span> / {currency} {(category.limit ?? 0).toLocaleString()}
          </div>

          <button
            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs sm:text-sm flex items-center gap-1"
            onClick={() => setEditingCategory(category)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span className={`font-medium ${
              isOverBudget(category) ? "text-red-600" : "text-green-600"
            }`}>
            {currency}{" "}
            {Math.abs(
              (category.limit ?? 0) - (category.spent ?? 0)
            ).toLocaleString()}
            {isOverBudget(category) ? " Over" : " Left"}
          </span>
          <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getProgressColor(progressPercentage)}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      {category.startDate && category.endDate && (
        <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
          {format(new Date(category.startDate), "MMM dd, yyyy")} -{" "}
          {format(new Date(category.endDate), "MMM dd, yyyy")}
        </p>
      )}
    </div>
  );
};

export default BudgetCategory;
