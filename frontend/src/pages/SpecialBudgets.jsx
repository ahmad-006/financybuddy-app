import React, { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import SpecialBudgetModal from "../components/dashboard/budget/SpecialBudgetModal";
import BudgetSummary from "../components/dashboard/budget/BudgetSummary";
import BudgetList from "../components/dashboard/budget/BudgetList";
import BudgetCategory from "../components/dashboard/budget/BudgetCategory";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addSpecialBudget,
  deleteSpecialBudget,
  fetchSpecialBudgets,
  fetchTransactions,
  fetchUser,
  updateSpecialBudget,
} from "@/utils/fetchData";

const SpecialBudgetsPage = ({ userId = "u1" }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingSpecialBudget, setEditingSpecialBudget] = useState(null);
  const [transfornedSpecialBudgets, setTransformedSpecialBudgets] = useState(
    []
  );

  const [user, setUser] = useState({});

  //effect to get current USER
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetchUser();
      setUser(res);
    };
    fetchUserData();
  }, []);
  const currentUser = user || {};

  const queryClient = useQueryClient();
  // initial monthlyBudget fetch
  const { data: transaction, error: fetchError } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  if (fetchError)
    toast.error(fetchError?.message || "error fetching transactions");

  const {
    data: specialBudgets,
    isLoading,
    error: budgetFetchError,
  } = useQuery({
    queryKey: ["specialBudgets"],
    queryFn: fetchSpecialBudgets,
  });

  if (budgetFetchError)
    toast.error(budgetFetchError?.message || "error fetching budgets");

  //? storing in a variable

  //? storing in a variable
  //using usememo because of re renders
  const budgets = useMemo(
    () => specialBudgets?.specialBudgets || [],
    [specialBudgets]
  );
  const transactions = useMemo(
    () => transaction?.transactions || [],
    [transaction]
  );

  //?Mutations functions
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSpecialBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["specialBudgets"],
        exact: true,
      });
      toast.success("Budget Deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete budget");
    },
  });

  const addMutation = useMutation({
    mutationFn: (data) => addSpecialBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["specialBudgets"],
        exact: true,
      });
      toast.success("Budget Added");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to Add budget");
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateSpecialBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["specialBudgets"],
        exact: true,
      });
      toast.success("Budget Updated");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update budget");
    },
  });

  useEffect(() => {
    try {
      const transformedSpecialBudgetsToSet = budgets.map((budget) => {
        const spent = transactions
          .filter((t) => {
            const sameCategory =
              t.category?.toLowerCase() === budget.category?.toLowerCase();

            const inRange =
              new Date(t.date) >= new Date(budget.startDate) &&
              new Date(t.date) <= new Date(budget.endDate);

            const sameTitle = t.title
              ?.toLowerCase()
              .includes(budget.title.toLowerCase());

            return (
              t.type?.toLowerCase() === "expense" &&
              sameCategory &&
              inRange &&
              sameTitle
            );
          })
          .reduce((sum, t) => sum + t.amount, 0);

        const categoryConfig = getCategoryConfig(budget.category);

        return {
          _id: budget._id,
          title: budget.title,
          category: budget.category,
          limit: parseFloat(budget.limit) || 0,
          spent: spent,
          ...categoryConfig,
          startDate: budget.startDate,
          endDate: budget.endDate,
        };
      });
      setTransformedSpecialBudgets(transformedSpecialBudgetsToSet);
    } catch (error) {
      console.error("Error processing special budgets:", error);
    }
  }, [userId, budgets, transactions]);

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

  const handleSaveSpecialBudget = async (budgetData) => {
    if (editingSpecialBudget) {
      const { id, limit, startDate, endDate, category, title } = budgetData;
      const data = {
        limit,
        startDate,
        endDate,
        category: category.toLowerCase(),
        title,
      };
      updateMutation.mutate({ id, data });
    } else {
      const { limit, startDate, endDate, category, title } = budgetData;
      const data = {
        limit,
        startDate,
        endDate,
        category: category.toLowerCase(),
        title,
      };
      addMutation.mutate(data);
    }
    setShowModal(false);
    setEditingSpecialBudget(null);
  };

  const handleEditSpecialBudget = (budget) => {
    setEditingSpecialBudget(budget);
    setShowModal(true);
  };

  const handleDeleteSpecialBudget = (id) => {
    deleteMutation.mutate(id);
  };

  const totalAllocated = transfornedSpecialBudgets.reduce(
    (sum, budget) => sum + (parseFloat(budget.limit) || 0),
    0
  );
  const totalSpent = transfornedSpecialBudgets.reduce(
    (sum, budget) => sum + (parseFloat(budget.spent) || 0),
    0
  );
  const remainingBudget = totalAllocated - totalSpent;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading special budget data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black bg-gray-50 p-4 sm:p-6">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 sm:p-4 mb-6 rounded-md">
        <p className="font-bold">Special Budgets</p>
        <p className="text-sm">
          Plan for unique, one-time expenses. Set a timeframe and amount to
          track spending for vacations, projects, or large purchases.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Special Budgets</h1>
          <button
            className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">Add New Special Budget</span>
          </button>
        </div>

        <BudgetSummary
          totalAllocated={totalAllocated}
          totalSpent={totalSpent}
          remainingBudget={remainingBudget}
          currency={currentUser?.currency}
        />

        <div className="grid grid-cols-1 gap-4">
          {" "}
          <BudgetList
            budgetCategories={transfornedSpecialBudgets}
            setEditingCategory={handleEditSpecialBudget}
            currency={"PKR"}
          />
        </div>

        {showModal && (
          <SpecialBudgetModal
            onClose={() => setShowModal(false)}
            onSave={handleSaveSpecialBudget}
            editingBudget={editingSpecialBudget}
            onDelete={handleDeleteSpecialBudget}
            currency={currentUser?.currency}
            isLoading={
              addMutation.isPending ||
              updateMutation.isPending ||
              deleteMutation.isPending
            }
          />
        )}
      </div>
    </div>
  );
};

export default SpecialBudgetsPage;
