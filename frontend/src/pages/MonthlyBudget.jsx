import React, { useState, useEffect } from "react";
import Header from "../components/dashboard/budget/Header";
import BudgetSummary from "../components/dashboard/budget/BudgetSummary";
import BudgetList from "../components/dashboard/budget/BudgetList";
import AddBudgetModal from "../components/dashboard/budget/AddBudgetModal";
import EditBudgetModal from "../components/dashboard/budget/EditBudgetModal";
import Charts from "../components/dashboard/budget/Charts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMonthlyBudget,
  deleteMonthlyBudget,
  fetchMonthlyBudgets,
  fetchTransactions,
  updateMonthlyBudget,
} from "@/utils/fetchData";
import { toast } from "react-toastify";
import { useMemo } from "react";

const BudgetPage = () => {
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    title: "",
    limit: 0,

    category: "",
    color: "#CCCCCC",
  });
  const queryClient = useQueryClient();

  // initial monthlyBudget fetch
  const { data: transaction, error: fetchError } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  if (fetchError)
    toast.error(fetchError?.message || "error fetching transactions");

  const {
    data: monthlyBudgets,
    isLoading,
    error: budgetFetchError,
  } = useQuery({
    queryKey: ["monthlyBudgets"],
    queryFn: fetchMonthlyBudgets,
  });

  if (budgetFetchError)
    toast.error(fetchError?.message || "error fetching budgets");

  //? storing in a variable

  const budgets = useMemo(
    () => monthlyBudgets?.monthlyBudgets || [],
    [monthlyBudgets]
  );

  const transactions = useMemo(
    () => transaction?.transactions || [],
    [transaction]
  );

  console.log(monthlyBudgets, budgets);

  //?Mutations functions
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteMonthlyBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["monthlyBudgets"],
        exact: true,
      });
      toast.success("Budget Deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete budget");
    },
  });

  const addMutation = useMutation({
    mutationFn: (data) => addMonthlyBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["monthlyBudgets"],
        exact: true,
      });
      toast.success("Budget Added");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to Add budget");
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateMonthlyBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["monthlyBudgets"],
        exact: true,
      });
      toast.success("Budget Updated");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update budget");
    },
  });

  //?Effect to transform budgets into required Form with all the validation

  useEffect(() => {
    try {
      const transformedBudgets = budgets.map((budget) => {
        //calcuting spent for each category
        const spent = transactions
          .filter((t) => {
            const transactionDate = new Date(t.date);
            const transactionMonth = transactionDate.getMonth() + 1;
            const transactionYear = transactionDate.getFullYear();

            return (
              t.title.toLowerCase().trim() ===
                budget.title.toLowerCase().trim() &&
              t.category === budget.category.toLowerCase() &&
              t.type === "expense" &&
              t.budgetType === "monthly" && // Added filter for monthly budget type
              transactionMonth === month &&
              transactionYear === year
            );
          })
          .reduce((sum, t) => sum + t.amount, 0);

        const categoryConfig = getCategoryConfig(budget.category);

        return {
          _id: budget._id,
          title: budget.title,
          category: budget.category, // <-- ADDED THIS LINE
          limit: parseFloat(budget.limit) || 0,
          spent: spent,
          ...categoryConfig,
        };
      });

      setBudgetCategories(transformedBudgets);
    } catch (error) {
      console.error("Error processing budgets:", error);
    }
  }, [month, year, budgets, transactions]);

  const getCategoryConfig = (category) => {
    const config = {
      Food: { icon: "🛒", color: "#36A2EB" },
      Utilities: { icon: "💡", color: "#FF9F40" },
      Entertainment: { icon: "🎬", color: "#4BC0C0" },
      Income: { icon: "💰", color: "#4CAF50" },
      Transportation: { icon: "🚗", color: "#FFCE56" },
      Housing: { icon: "🏠", color: "#FF6384" },
      "Dining Out": { icon: "🍽️", color: "#9966FF" },
    };

    return config[category] || { icon: "📁", color: "#CCCCCC" };
  };

  //const
  const handleAddCategory = () => {
    if (!newCategory.title || newCategory.limit <= 0 || !newCategory.category) {
      return toast.info("please provide correct information");
    }
    addMutation.mutate(newCategory);

    // const newCat = {
    //   ...newCategory,
    //   spent: 0,
    // };

    // setBudgetCategories([...budgetCategories, newCat]);
    setNewCategory({
      title: "",
      limit: 0,
      category: "",
      color: "#CCCCCC",
    });
    setShowAddModal(false);
  };

  const handleUpdateCategory = () => {
    if (
      !editingCategory.title ||
      editingCategory.limit <= 0 ||
      !editingCategory.category
    )
      return toast.info("please provide correct information");

    const { title, category, limit } = editingCategory;

    const data = { title, category: category.toLowerCase(), limit };
    console.log("cate:", data);
    const id = editingCategory._id;
    updateMutation.mutate({ id, data });
    // setBudgetCategories(
    //   budgetCategories.map((cat) =>
    //     cat._id === editingCategory._id ? editingCategory : cat
    //   )
    // );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    deleteMutation.mutate(id);
  };

  const totalAllocated = budgetCategories.reduce(
    (sum, cat) => sum + cat.limit,
    0
  );
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalAllocated - totalSpent;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading budget data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black bg-gray-50 p-4 sm:p-6">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md">
        <p className="font-bold">Monthly Budget Management</p>
        <p>Take control of your spending by creating and managing monthly budgets for different categories. Set limits for categories like 'Food', 'Utilities', and 'Entertainment' to get a clear picture of where your money is going. This page helps you stay on track with your financial goals by visualizing your spending against your allocated budgets.</p>
      </div>
      <div className="max-w-7xl mx-auto">
        <Header
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
          setShowAddModal={setShowAddModal}
          currentUser={{ name: "Ahmad Aamir" }}
        />

        <BudgetSummary
          totalAllocated={totalAllocated}
          totalSpent={totalSpent}
          remainingBudget={remainingBudget}
          currency={"PKR"}
        />

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[300px] flex-grow">
          <BudgetList
            budgetCategories={budgetCategories}
            setEditingCategory={setEditingCategory}
            currency={"PKR"}
          />

          <Charts
            key={`${year}-${transactions.length}-${budgets.length}`}
            budgetCategories={budgetCategories}
            currency={"PKR"}
            year={year}
            budgets={budgets}
            transactions={transactions}
          />
        </div>

        {showAddModal && (
          <AddBudgetModal
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            setShowAddModal={setShowAddModal}
            handleAddCategory={handleAddCategory}
            currency={"PKR"}
          />
        )}

        {editingCategory && (
          <EditBudgetModal
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
            handleUpdateCategory={handleUpdateCategory}
            handleDeleteCategory={handleDeleteCategory}
            currency={"PKR"}
          />
        )}
      </div>
    </div>
  );
};

export default BudgetPage;
