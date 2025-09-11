import React, { useState, useEffect, useMemo } from "react";
import { mockProfiles } from "../data/data";
import { Plus } from "lucide-react";
import SpecialBudgetModal from "../components/dashboard/budget/SpecialBudgetModal";
import BudgetSummary from "../components/dashboard/budget/BudgetSummary";
import BudgetList from "../components/dashboard/budget/BudgetList";
import { toast } from "react-toastify";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addSpecialBudget,
  deleteSpecialBudget,
  fetchSpecialBudgets,
  fetchTransactions,
  updateSpecialBudget,
} from "@/utils/fetchData";

const SpecialBudgetsPage = ({ userId = "u1" }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingSpecialBudget, setEditingSpecialBudget] = useState(null);
  const [transfornedSpecialBudgets, setTransformedSpecialBudgets] = useState(
    []
  );
  const currentUser = mockProfiles.find((profile) => profile.id === userId);

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

  console.log(budgets);
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
          id: budget._id,
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
      console.log(budgetData);
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
      try {
        console.log("sending");
        const { limit, startDate, endDate, category, title } = budgetData;
        const data = {
          limit,
          startDate,
          endDate,
          category: category.toLowerCase(),
          title,
        };
        addMutation.mutate(data);
      } catch (error) {
        console.log(error);
      }
    }
    setShowModal(false);
    setEditingSpecialBudget(null);
  };

  const handleEditSpecialBudget = (budget) => {
    console.log(budget);
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
            budgetCategories={transfornedSpecialBudgets}
            setEditingCategory={handleEditSpecialBudget}
            currency={"PKR"}
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
