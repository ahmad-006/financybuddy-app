import React, { useState } from "react";
import { mockProfiles, mockTransactions } from "../data/data";
import { Plus } from "lucide-react";
import SpecialBudgetModal from "../components/dashboard/budget/SpecialBudgetModal";
import BudgetSummary from "../components/dashboard/budget/BudgetSummary";
import BudgetList from "../components/dashboard/budget/BudgetList";

const SpecialBudgetsPage = ({ userId = "u1" }) => {
  const [specialBudgets, setSpecialBudgets] = useState([
    {
      id: "sb1",
      userId: "u1",
      title: "Summer Vacation",
      category: "Travel",
      limit: 10000,
      startDate: "2025-07-01",
      endDate: "2025-07-15",
    },
    {
      id: "sb2",
      userId: "u1",
      title: "New Laptop",
      category: "Shopping",
      limit: 5000,
      startDate: "2025-08-10",
      endDate: "2025-08-20",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingSpecialBudget, setEditingSpecialBudget] = useState(null);

  const currentUser = mockProfiles.find((profile) => profile.id === userId);

  const getCategoryConfig = (category) => {
    const config = {
      Food: { icon: "🛒", color: "#36A2EB" },
      Utilities: { icon: "💡", color: "#FF9F40" },
      Entertainment: { icon: "🎬", color: "#4BC0C0" },
      Income: { icon: "💰", color: "#4CAF50" },
      Transportation: { icon: "🚗", color: "#FFCE56" },
      Housing: { icon: "🏠", color: "#FF6384" },
      "Dining Out": { icon: "🍽️", color: "#9966FF" },
      Shopping: { icon: "🛍️", color: "#FF69B4" },
      Salary: { icon: "💵", color: "#00CED1" },
      Travel: { icon: "✈️", color: "#FFA500" },
    };
    return config[category] || { icon: "📁", color: "#CCCCCC" };
  };

  // Calculate derived state directly instead of using a useEffect hook
  const processedBudgets = specialBudgets.map((budget) => {
    const spent = mockTransactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        const budgetStartDate = new Date(budget.startDate);
        const budgetEndDate = new Date(budget.endDate);
        return (
          t.userId === userId &&
          t.category === budget.category &&
          t.type === "expense" &&
          transactionDate >= budgetStartDate &&
          transactionDate <= budgetEndDate
        );
      })
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    const categoryConfig = getCategoryConfig(budget.category);

    return {
      id: budget.id,
      name: budget.title,
      category: budget.category,
      allocated: parseFloat(budget.limit) || 0,
      spent: spent,
      ...categoryConfig,
      startDate: budget.startDate,
      endDate: budget.endDate,
    };
  });

  const handleSaveSpecialBudget = (budgetData) => {
    const dataToSave = {
      ...budgetData,
      limit: parseFloat(budgetData.limit) || 0,
    };

    if (editingSpecialBudget) {
      setSpecialBudgets((prev) =>
        prev.map((b) =>
          b.id === editingSpecialBudget.id ? { ...b, ...dataToSave } : b
        )
      );
    } else {
      setSpecialBudgets((prev) => [
        ...prev,
        { ...dataToSave, id: `sb${Date.now()}` },
      ]);
    }
    setShowModal(false);
    setEditingSpecialBudget(null);
  };

  const handleEditSpecialBudget = (budget) => {
    setEditingSpecialBudget(budget);
    setShowModal(true);
  };

  const handleDeleteSpecialBudget = (id) => {
    setSpecialBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  const totalAllocated = processedBudgets.reduce(
    (sum, budget) => sum + budget.allocated,
    0
  );
  const totalSpent = processedBudgets.reduce(
    (sum, budget) => sum + budget.spent,
    0
  );
  const remainingBudget = totalAllocated - totalSpent;

  return (
    <div className="min-h-screen text-black bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 ">Special Budgets</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={() => {
              setEditingSpecialBudget(null);
              setShowModal(true);
            }}
          >
            <Plus className="w-5 h-5" />
            Add New Special Budget
          </button>
        </div>

        <BudgetSummary
          totalAllocated={totalAllocated}
          totalSpent={totalSpent}
          remainingBudget={remainingBudget}
          currency={currentUser?.currency}
        />

        <div>
          <BudgetList
            budgetCategories={processedBudgets}
            setEditingCategory={handleEditSpecialBudget}
            currency={currentUser?.currency}
          />
        </div>

        {showModal && (
          <SpecialBudgetModal
            onClose={() => setShowModal(false)}
            onSave={handleSaveSpecialBudget}
            editingBudget={editingSpecialBudget}
            onDelete={handleDeleteSpecialBudget}
            currency={currentUser?.currency}
          />
        )}
      </div>
    </div>
  );
};

export default SpecialBudgetsPage;
