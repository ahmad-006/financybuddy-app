import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditBudgetModal = ({
  editingCategory,
  setEditingCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  currency,
  isUpdating,
  isDeleting,
}) => {
  const categories = [
    "Food",
    "Dining Out",
    "Shopping",
    "Housing",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Income",
    "Philanthropy",
    "Healthcare",
    "Education",
    "Subscriptions",
    "Savings",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Edit Budget
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingCategory.title}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  title: e.target.value,
                })
              }
              readOnly={!!editingCategory}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select
              value={editingCategory.category?.toLowerCase() || ""}
              onValueChange={(value) =>
                setEditingCategory({
                  ...editingCategory,
                  category: value.toLowerCase(),
                })
              }
              disabled={!!editingCategory}
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="max-h-72 overflow-y-auto">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget Amount ({currency})
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingCategory.limit}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  limit: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                handleDeleteCategory(editingCategory._id);
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>

            <div className="flex gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setEditingCategory(null)}
                disabled={isUpdating || isDeleting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleUpdateCategory}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBudgetModal;
