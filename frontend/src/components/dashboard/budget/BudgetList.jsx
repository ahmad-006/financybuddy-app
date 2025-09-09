import React from "react";
import BudgetCategory from "./BudgetCategory";

const BudgetList = ({
  budgetCategories,
  setEditingCategory,
  currency,
}) => {
  const isOverBudget = (category) => category.spent > category.allocated;

  const getProgressPercentage = (category) => {
    if (category.allocated === 0) return 0;
    return Math.min(100, (category.spent / category.allocated) * 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage > 100) return "bg-red-500";
    if (percentage > 80) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Budget Categories
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {budgetCategories.map((category) => (
          <BudgetCategory
            key={category.id}
            category={category}
            setEditingCategory={setEditingCategory}
            currency={currency}
            isOverBudget={isOverBudget}
            getProgressPercentage={getProgressPercentage}
            getProgressColor={getProgressColor}
          />
        ))}

        {budgetCategories.length === 0 && (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">📊</div>
            <p className="text-gray-500">No budgets created yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Add a budget to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetList;