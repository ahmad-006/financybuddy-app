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
}) => {
  const categoryIcons = [
    "🏠",
    "🛒",
    "🚗",
    "🎬",
    "🍽️",
    "💡",
    "👕",
    "📱",
    "🏥",
    "✈️",
    "🎁",
    "💰",
  ];

  const categories = [
    "Food",
    "Shopping",
    "Salary",
    "Utilities",
    "Entertainment",
    "Housing",
    "Transportation",
    "Dining Out",
    "Income",
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
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select
              value={editingCategory.category || ""}
              onValueChange={(value) =>
                setEditingCategory({ ...editingCategory, category: value })
              }
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
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
              value={editingCategory.allocated}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  allocated: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {categoryIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className={`text-xl p-2 rounded-lg transition-colors ${
                    editingCategory.icon === icon
                      ? "bg-blue-100 ring-2 ring-blue-500"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setEditingCategory({ ...editingCategory, icon })
                  }
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              onClick={() => {
                handleDeleteCategory(editingCategory.id);
                setEditingCategory(null);
              }}
            >
              Delete
            </button>

            <div className="flex gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleUpdateCategory}
            >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBudgetModal;
