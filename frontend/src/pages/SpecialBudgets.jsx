import React, { useState, useEffect } from "react";
import { mockProfiles, mockTransactions } from "../data/data";
import { Plus } from "lucide-react";
import SpecialBudgetModal from "../components/dashboard/budget/SpecialBudgetModal"; // Will create this next
import BudgetSummary from "../components/dashboard/budget/BudgetSummary"; // Reusing for now, will adapt
import BudgetList from "../components/dashboard/budget/BudgetList"; // Reusing for now, will adapt

const SpecialBudgetsPage = ({ userId = "u1" }) => {
  const [specialBudgets, setSpecialBudgets] = useState([
    // Dummy Data for now
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
  console.log("Initial specialBudgets state:", specialBudgets);
  const [showModal, setShowModal] = useState(false);
  const [editingSpecialBudget, setEditingSpecialBudget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = mockProfiles.find((profile) => profile.id === userId);

  useEffect(() => {
    setIsLoading(true);
    try {
      const transformedSpecialBudgets = specialBudgets.map((budget) => {
        const spent = mockTransactions
          .filter((t) => {
            const transactionDate = new Date(t.date);
            const budgetStartDate = new Date(budget.startDate);
            const budgetEndDate = new Date(budget.endDate);

            return (
              t.userId === userId &&
              t.category === budget.category &&
              t.type === "expense" &&
              t.budgetType === "special" && // Added filter for special budget type
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

      setSpecialBudgets(transformedSpecialBudgets);
    } catch (error) {
      console.error("Error processing special budgets:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]); // Removed specialBudgets from dependency array to prevent loop

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

  const handleSaveSpecialBudget = (budgetData) => {
    if (editingSpecialBudget) {
      setSpecialBudgets((prev) =>
        prev.map((b) =>
          b.id === editingSpecialBudget.id ? { ...b, ...budgetData } : b
        )
      );
    } else {
      setSpecialBudgets((prev) => [
        ...prev,
        { ...budgetData, id: `sb${Date.now()}` },
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

  const totalAllocated = specialBudgets.reduce(
    (sum, budget) => sum + (parseFloat(budget.limit) || 0),
    0
  );
  const totalSpent = specialBudgets.reduce(
    (sum, budget) => sum + (parseFloat(budget.spent) || 0),
    0
  );
  const remainingBudget = totalAllocated - totalSpent;

  console.log("totalAllocated:", totalAllocated);
  console.log("totalSpent:", totalSpent);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading special budget data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 ">Special Budgets</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <Plus className="inline-block w-5 h-5 mr-2" />
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
          {" "}
          <BudgetList
            budgetCategories={specialBudgets}
            setEditingCategory={handleEditSpecialBudget}
            currency={currentUser?.currency}
          />
          {/* <Charts
            budgetCategories={specialBudgets}
            currency={currentUser?.currency}
            year={year}
            userId={userId}
          /> */}
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
